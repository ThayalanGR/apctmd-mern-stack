import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import Player from "./player";
import Graph from "./graph";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.getGasData = this.getGasData.bind(this);
  }
  state = {
    handlerEvent: null
  };

  async getGasData() {
    if (!this.props.isAuthenticated) {
      clearInterval(this.state.handlerEvent);
    } else {
      await this.props.getSensorData();
    }
  }

  componentDidMount() {
    const handlerEvent = setInterval(this.getGasData, 5000);
    this.setState({
      handlerEvent: handlerEvent
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-0">
          <div className="col-5 ">
            <Player />
          </div>
          <div className="col-7 pl-4">
            <Graph history={this.props.history} gasId={1} gasName={"MQ135"} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 p-4">
            <Graph history={this.props.history} gasId={2} gasName={"MQ2"} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 p-4 ">
            <Graph history={this.props.history} gasId={3} gasName={"MQ9"} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 p-4 ">
            <Graph history={this.props.history} gasId={4} gasName={"MCQL1"} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 p-4 ">
            <Graph history={this.props.history} gasId={5} gasName={"MCQL1"} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
