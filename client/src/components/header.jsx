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
    console.log("signout got called");
    await this.props.signOut();
  }
  state = {};
  render() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark "
        style={{ marginBottom: "30px" }}
      >
        {!this.props.isAuthenticated ? (
          <Link
            className="navbar-brand text-light font-weight-bold ml-2"
            key="dashboard"
            to="/"
          >
            Air Pollution Control and Monitoring Drone
          </Link>
        ) : (
          <Link
            className="navbar-brand text-light font-weight-bold ml-2"
            key="dashboard"
            to="/dashboard"
          >
            Air Pollution Control and Monitoring Drone
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
          <ul className="nav navbar-nav ml-auto">
            {!this.props.isAuthenticated ? (
              [
                <li className="nav-item" key="signin">
                  <Link className="nav-link" to="/signin">
                    sign In
                  </Link>
                </li>,
                <li className="nav-item" key="signup">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              ]
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  key="signout"
                  to="/signout"
                  onClick={this.signOut}
                >
                  Sign Out
                </Link>
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
