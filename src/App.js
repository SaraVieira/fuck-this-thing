import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import Home from './Home'
import Thing from './Thing'
import './style.css'
import 'normalize.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/:thing" component={Thing} />
  </Switch>
)

export default App
