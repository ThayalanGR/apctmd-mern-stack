import React, { Component } from "react";
import Plotly from "plotly.js";
import { connect } from "react-redux";
import * as actions from "../actions";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.plotChart = this.plotChart.bind(this);
    this.redir = this.redir.bind(this);
  }

  state = {
    liveData: 0,
    peakData: 0,
    time: 0,
    cnt: 0,
    plotInstance: null
  };

  redir() {
    this.props.history.push("/");
  }

  async plotChart() {
    const gasId = this.props.gasId - 1;
    // console.log(gasId);

    if (!this.props.isAuthenticated) {
      await clearInterval(this.state.plotInstance);
      // return <Redirect to="/" />;
      // this.context.history.push("/");
      setTimeout(this.redir, 3000);
      // this.props.history.push("/");
    }

    console.log(this.props.sensorData.gas1);

    let gasData = [];

    gasData.push(this.props.sensorData.gas1);
    gasData.push(this.props.sensorData.gas2);
    gasData.push(this.props.sensorData.gas3);

    let peak =
      this.state.peakData > gasData[gasId]
        ? this.state.peakData
        : gasData[gasId];

    console.log("previous: ", this.state.peakData);
    console.log("current", gasData[gasId]);
    let chart = this.chart;

    Plotly.extendTraces(chart, { y: [[gasData[gasId]]] }, [0]);

    this.setState({
      liveData: gasData[gasId],
      peakData: peak,
      time: this.props.sensorData.createdAt,
      cnt: this.state.cnt + 1
    });
    if (this.state.cnt > 500) {
      Plotly.relayout(chart, {
        xaxis: {
          range: [this.state.cnt - 500, this.state.cnt]
        }
      });
    }
  }

  componentDidMount() {
    const chart = this.chart;
    Plotly.plot(chart, [
      {
        y: [0],
        type: "line"
      }
    ]);
    const interval = setInterval(this.plotChart, 5000);

    this.setState({
      plotInstance: interval
    });
  }

  render() {
    return (
      <div className="shadow ml-2" id="graph-wrapper">
        <div className="graph-details bg-light p-3 shadow">
          <span className="font-weight-normal text-primary h5">
            Gas Sensor:
          </span>
          <u className="font-weight-bold pl-2 h5 text-primary">
            {this.props.gasName}
          </u>
        </div>
        <div className="graph" ref={chart => (this.chart = chart)} />

        <div className="graph-footer bg-light p-3 shadow d-flex flex-row align-items-center">
          <div>
            <span className="h5 font-weight-bold text-primary">Live data:</span>
            <span className="font-weight-bold text-success h5 ml-4">
              {this.state.liveData}
            </span>
          </div>
          <div className="ml-5">
            <span className="h5 font-weight-bold text-danger pl-4">
              Peak Sensor data:
            </span>
            <span className="font-weight-bold text-danger h5 ml-4">
              {this.state.peakData}
            </span>
          </div>
          <div className="ml-5">
            <span className="h5 font-weight-bold text-danger pl-4">Time :</span>
            <span className="font-weight-bold text-danger h5 ml-4">
              {this.state.time}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    sensorData: state.gas.sensorData
  };
}

export default connect(
  mapStateToProps,
  actions
)(Graph);
