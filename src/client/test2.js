import React, { Component } from 'react'

class Example extends Component {
  state = {
    ticks: 1
  }

  advance() {
    this.setState({ ticks: this.state.ticks + 1 })
  }

  render() {
    return (
      <div onClick={::this.advance}>{ this.state.ticks }</div>
    )
  }
}

export default Example
