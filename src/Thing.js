import React, { Fragment } from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'

const getRelated = thing => thing.RelatedTopics && thing.RelatedTopics[0]
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const api = path =>
  fetch(`https://api.duckduckgo.com/?q=${path}&format=json&pretty=1`)

class Home extends React.Component {
  state = { thing: null, loading: true }
  componentDidMount = () =>
    api(this.props.match.params.thing)
      .then(r => r.json())
      .then(thing => this.setState({ thing, loading: false }))

  render() {
    const { thing, loading } = this.state
    const {
      match: { params }
    } = this.props
    return (
      <main class="tc">
        <Helmet>
          <title>I Fucking Hate {capitalize(params.thing)}</title>
        </Helmet>
        <header class="bg-gold sans-serif">
          <div class="mw9 center ph2 pv6 pt5-ns ph7-l">
            <h3 class="f1 f1-m f-headline-l lh-title mv0">
              <span class="bg-black-90 lh-copy white pa1 tracked-tight">
                I fucking hate {capitalize(params.thing)}
              </span>
            </h3>
            {typeof window !== 'undefined' ? (
              <a
                class="resp-sharing-button__link"
                href={`https://twitter.com/intent/tweet/?text=I%20Fucking%20Hate%20${
                  params.thing
                }&amp;url=${window.location.href}`}
                target="_blank"
                aria-label="Share on Twitter"
                rel="noopener noreferrer"
              >
                <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large">
                  <div
                    aria-hidden="true"
                    class="resp-sharing-button__icon resp-sharing-button__icon--circle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm5.26 9.38v.34c0 3.48-2.64 7.5-7.48 7.5-1.48 0-2.87-.44-4.03-1.2 1.37.17 2.77-.2 3.9-1.08-1.16-.02-2.13-.78-2.46-1.83.38.1.8.07 1.17-.03-1.2-.24-2.1-1.3-2.1-2.58v-.05c.35.2.75.32 1.18.33-.7-.47-1.17-1.28-1.17-2.2 0-.47.13-.92.36-1.3C7.94 8.85 9.88 9.9 12.06 10c-.04-.2-.06-.4-.06-.6 0-1.46 1.18-2.63 2.63-2.63.76 0 1.44.3 1.92.82.6-.12 1.95-.27 1.95-.27-.35.53-.72 1.66-1.24 2.04z" />
                    </svg>
                  </div>
                  Share on Twitter
                </div>
              </a>
            ) : null}
          </div>
        </header>
        <h2 class="f3 mid-gray lh-title">WTF is {capitalize(params.thing)}?</h2>
        {thing && thing.meta ? (
          <article className="flex flex-column justify-center items-center">
            {thing.Image || getRelated(thing).Icon.URL ? (
              <img
                className="mb4 mt2 image"
                alt={params.thing}
                src={thing.Image || getRelated(thing).Icon.URL}
              />
            ) : null}
            <p class="tl f6 f5-ns lh-copy measure i pl4 mb2 bl bw1 b--gold mb4">
              {thing.AbstractText || getRelated(thing).Text}
            </p>
            <a
              class="mb4 f4 fw7 dib pa2 no-underline bg-animate bg-white hover-bg-light-blue black"
              href={`https://duckduckgo.com/${params.thing}`}
            >
              Search on Duck Duck Go
            </a>
          </article>
        ) : (
          <Fragment>
            {loading ? (
              <h2 class="f3 mid-gray lh-title">Trying to find out</h2>
            ) : (
              <Fragment>
                <h2 class="f3 mid-gray lh-title">Good fucking question</h2>
                <a
                  class="mb4 f4 fw7 dib pa2 no-underline bg-animate bg-white hover-bg-light-blue black"
                  href={`https://duckduckgo.com/${params.thing}`}
                >
                  Search on Duck Duck Go
                </a>
              </Fragment>
            )}
          </Fragment>
        )}
      </main>
    )
  }
}

export default withRouter(Home)
