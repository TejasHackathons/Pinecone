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
      consentLoc: true,
      error: false,
      latitude: "-1000",
      longitude: "-1000",
    };
  }
  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log(pos);
        },
        (err) => console.log(err)
      );
    }
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

        <Button
          variant="outlined"
          style={{
            fontFamily: "Helvetica Neue",
            fontWeight: "300",
            color: "#FF7700",
            borderColor: "#FF7700",
          }}
          onClick={() => {
            if (!this.state.phoneNumber == "" && !this.state.password == "") {
              axios
                .post("/account/signUp", {
                  phoneNumber: this.state.phoneNumber,
                  password: this.state.password,
                })
                .then((res) => {
                  this.setState({
                    error: false,
                  });
                  window.open("/disasterMap", "_self");
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
