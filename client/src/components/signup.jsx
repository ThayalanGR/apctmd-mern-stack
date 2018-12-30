import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import * as actions from "../actions";
import CustomInput from "./custominput";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {};

  async onSubmit(formData) {
    await this.props.signUp({ user: formData });
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-7 shadow-lg p-4 mt-4">
          <h4 className="text-center font-weight-bold mb-3">
            Create an Account
            <hr />
          </h4>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="name"
                type="text"
                id="name"
                label="Enter your name"
                placeholder="david"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                label="Enter your email-id"
                placeholder="example@example.com"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="mobile"
                type="number"
                id="mobile"
                label="Enter your mobile number"
                placeholder="8558433782"
                component={CustomInput}
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="password"
                id="password"
                label="Enter your password"
                placeholder="your password"
                component={CustomInput}
              />
            </fieldset>

            {this.props.errorMessage ? (
              <div className="alert alert-danger">
                {this.props.errorMessage}
              </div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              sign up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  };
}
export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signup" })
)(SignUp);
