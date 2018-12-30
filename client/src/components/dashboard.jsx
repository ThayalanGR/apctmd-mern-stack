import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";

class Dashboard extends Component {
  state = {};

  async componentDidMount() {
    await this.props.getSecret();
  }
  render() {
    return <p>{this.props.secret}</p>;
  }
}

function mapStateToProps(state) {
  return {
    secret: state.dash.secret
  };
}

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
