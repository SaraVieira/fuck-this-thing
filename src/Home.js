import React from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { Twitter } from 'react-social-sharing'

const Input = styled.input`
  border: 0;
  background: inherit;
  color: white;
  border-bottom: 4px solid white;
  width: 400px;
  max-width: 100%;
  height: 121px;
`

const Form = styled.form`
  display: inline;
`

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
        <h3 className="f2 f1-m f-headline-l lh-title mv0 tc">
          <span className="bg-black-90 lh-copy white pa1 tracked-tight">
            <Form onSubmit={this.goToThing}>
              <label for="hate">I fucking hate</label>
              <Input
                className="f2 f1-m f-headline-l lh-title b pa2 pl4 ml3"
                onChange={this.addThing}
                id="hate"
                type="text"
              />
            </Form>
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
