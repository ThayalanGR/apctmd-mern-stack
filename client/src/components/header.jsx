import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../actions";
class Header extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }
  async signOut() {
    await this.props.signOut();
  }
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-primary bg-primary fixed-top shadow-lg"
        style={{ marginBottom: "30px" }}
      >
        {!this.props.isAuthenticated ? (
          <Link
            className="navbar-brand text-light font-weight-bold ml-2"
            key="dashboard"
            to="/"
          >
            <i className="fas fa-helicopter" />
            &nbsp; Air Pollution Control and Monitoring Drone
          </Link>
        ) : (
          <Link
            className="navbar-brand text-light font-weight-bold ml-2"
            key="dashboard"
            to="/dashboard"
          >
            <i className="fas fa-helicopter" />
            &nbsp; Air Pollution Control and Monitoring Drone
          </Link>
        )}
        <div className="collapse navbar-collapse">
          {/* <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul> */}
          <ul className="nav navbar-nav ml-auto ">
            {!this.props.isAuthenticated ? (
              [
                <li className="nav-item" key="signin">
                  <Link
                    className="nav-link text-light font-weight-bold"
                    to="/signin"
                  >
                    sign In
                  </Link>
                </li>,
                <li className="nav-item" key="signup">
                  <Link
                    className="nav-link text-light font-weight-bold"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              ]
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link text-light btn btn-link font-weight-bold"
                  key="signout"
                  onClick={this.signOut}
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
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
)(Header);
