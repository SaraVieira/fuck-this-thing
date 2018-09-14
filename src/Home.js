import React from 'react'
import { Redirect } from 'react-router'
import { Helmet } from 'react-helmet'

class Home extends React.Component {
  state = { thing: '', filled: false }

  addThing = e => this.setState({ thing: e.target.value })

  goToThing = e => {
    e.preventDefault()
    this.setState({ filled: true })
  }

  render() {
    return (
      <main className="bg-gold sans-serif vh-100 vw-100 flex flex-column justify-center items-center">
        <Helmet>
          <title>I Fucking Hate</title>
        </Helmet>
        <h3 className="mw-100 f1 f1-m f-headline-l lh-title mv0 tc">
          <span className="bg-black-90 lh-copy white pa1 pl3 tracked-tight">
            <form className="form" onSubmit={this.goToThing}>
              <label for="hate">I fucking hate</label>
              <input
                className="input f2 f1-m f-headline-l lh-title b pa2 pl4 ml3 mr3"
                onChange={this.addThing}
                placeholder="Wizzair"
                id="hate"
                type="text"
              />
            </form>
          </span>
        </h3>
        {this.state.filled ? (
          <Redirect
            to={{
              pathname: `/${this.state.thing}`
            }}
          />
        ) : null}
      </main>
    )
  }
}

export default Home
