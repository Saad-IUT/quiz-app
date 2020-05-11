import React, { Component } from "react"

const WebPageBodyGlobalStyle = {
  marginTop: "50px",
}

const HomePageBodyContainerStyle = {
  padding: "2%",
}

class HomePageLayout extends Component {
  state = {}
  render() {
    return (
      <div style={WebPageBodyGlobalStyle}>
        <h1>Quiz App</h1>
        <div style={HomePageBodyContainerStyle}>{this.props.children}</div>
        Built by Saad Bin Johir
      </div>
    )
  }
}

export default HomePageLayout