import App from './App'
import React from 'react'
import { StaticRouter } from 'react-router-dom'
import express from 'express'
import { Helmet } from 'react-helmet'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet } from 'styled-components'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const sheet = new ServerStyleSheet()
    // When the app is rendered collect the styles that are used inside it
    // Generate all the style tags so they can be rendered into the page
    const context = {}
    const markup = renderToString(
      sheet.collectStyles(
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      )
    )
    const helmet = Helmet.renderStatic()
    const styleTags = sheet.getStyleTags()

    if (context.url) {
      res.redirect(context.url)
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="en" ${helmet.htmlAttributes.toString()}>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        ${helmet.title.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css"/>
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        ${styleTags}
    </head>
    <body class="h-100 w-100 avenir" ${helmet.bodyAttributes.toString()}>
        <div id="root">${markup}</div>
    </body>
</html>`
      )
    }
  })

export default server
