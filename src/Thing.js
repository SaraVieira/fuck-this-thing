import React, { Fragment } from 'react'
import { withRouter } from 'react-router'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

const api = path =>
  fetch(`https://api.duckduckgo.com/?q=${path}&format=json&pretty=1`)

class Home extends React.Component {
  state = { thing: null }
  componentDidMount = () =>
    api(this.props.match.params.thing)
      .then(r => r.json())
      .then(thing => this.setState({ thing }))

  render() {
    const thing = this.state.thing && this.state.thing.RelatedTopics[0]
    return (
      <main class="tc">
        <header class="bg-gold sans-serif">
          <div class="mw9 center pa6 pt5-ns ph7-l">
            <h3 class="f2 f1-m f-headline-l measure-narrow lh-title mv0">
              <span class="bg-black-90 lh-copy white pa1 tracked-tight">
                I fucking hate {capitalize(this.props.match.params.thing)}
              </span>
            </h3>
          </div>
        </header>
        <h2 class="f3 mid-gray lh-title">
          WTF is {capitalize(this.props.match.params.thing)}?
        </h2>
        {thing ? (
          <article className="flex flex-column justify-center items-center">
            <img
              alt={this.props.match.params.thing}
              src={thing.Icon.URL}
              height={thing.Icon.Height}
              width={thing.Icon.Width}
            />
            <p class="f6 f5-ns lh-copy measure i pl4 mb2 bl bw1 b--gold mb4">
              {thing.Text}
            </p>
            <a
              class="f4 fw7 dib pa2 no-underline bg-animate bg-white hover-bg-light-blue black"
              href={thing.FirstURL}
            >
              Search on Duck Duck Go
            </a>
          </article>
        ) : (
          <Fragment>
            <h2 class="f3 mid-gray lh-title">Good fucking question</h2>
            <a
              class="f4 fw7 dib pa2 no-underline bg-animate bg-white hover-bg-light-blue black"
              href={`https://duckduckgo.com/${this.props.match.params.thing}`}
            >
              Search on Duck Duck Go
            </a>
          </Fragment>
        )}
      </main>
    )
  }
}

export default withRouter(Home)
