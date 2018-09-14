import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { injectGlobal } from 'styled-components'
import Home from './Home'
import Thing from './Thing'
import tachyons from 'tachyons/css/tachyons.min.css'
import normalize from 'normalize.css'

injectGlobal`
 ${tachyons}
 ${normalize}
`

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/:thing" component={Thing} />
  </Switch>
)

export default App
