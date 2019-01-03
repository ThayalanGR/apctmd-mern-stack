import React, { Component } from "react";
import Header from "./components/header";

class App extends Component {
  render() {
    return (
      <div id="body" style={{ minHeight: "100vh" }}>
        <Header />
        <div className="container-fluid mt-5 pt-5">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
