import React, { Component } from "react";

class CustomInput extends Component {
  state = {};
  render() {
    const {
      input: { value, onChange }
    } = this.props;
    return (
      <div className="form-group">
        <label className="font-weight-bold" htmlFor={this.props.id}>
          {this.props.label}
        </label>
        <input
          name={this.props.name}
          id={this.props.id}
          placeholder={this.props.placeholder}
          type={this.props.type}
          className="form-control"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default CustomInput;
