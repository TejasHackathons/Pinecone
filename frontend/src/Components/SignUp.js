import React, { Component } from "react";
import { TextField, Button, Alert } from "@mui/material";
import axios from "axios";
import "./SignUp.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      password: "",
      error: false,
      latitude: "",
      longitude: "",
    };
  }

  render() {
    return (
      <div className="signUpContainer">
        <h1 className="signUpHeader">Sign Up</h1>
        {this.state.error ? (
          <Alert severity="error">{this.state.error}</Alert>
        ) : (
          <></>
        )}
        <TextField
          className="textField"
          variant="filled"
          placeholder="Phone Number"
          value={this.state.phoneNumber}
          required
          onChange={(evt) => {
            this.setState({ phoneNumber: evt.target.value });
          }}
        />

        <TextField
          className="textField"
          variant="filled"
          type="password"
          placeholder="Password"
          value={this.state.password}
          required
          onChange={(evt) => {
            this.setState({ password: evt.target.value });
          }}
        />
        <TextField
          className="textField"
          variant="filled"
          type="number"
          placeholder="Latitude"
          value={this.state.latitude}
          required
          onChange={(evt) => {
            this.setState({ latitude: evt.target.value });
          }}
        />
        <TextField
          className="textField"
          variant="filled"
          type="number"
          placeholder="Longitude"
          value={this.state.longitude}
          required
          onChange={(evt) => {
            this.setState({ longitude: evt.target.value });
          }}
        />

        <Button
          variant="outlined"
          style={{
            fontFamily: "Helvetica Neue",
            fontWeight: "300",
            color: "#FF7700",
            borderColor: "#FF7700",
          }}
          onClick={() => {
            if (
              !this.state.phoneNumber == "" &&
              !this.state.password == "" &&
              !this.state.latitude == "" &&
              !this.state.longitude == ""
            ) {
              axios
                .post("/account/signUp", {
                  phoneNumber: this.state.phoneNumber,
                  password: this.state.password,
                  homeLat: this.state.latitude,
                  homeLong: this.state.longitude,
                })
                .then((res) => {
                  this.setState({
                    error: false,
                  });

                  window.open("/logIn", "_self");
                })
                .catch((err) => {
                  this.setState({
                    error: err.response.data,
                  });
                });
            }
          }}
        >
          Sign Up
        </Button>
      </div>
    );
  }
}

export default SignUp;
