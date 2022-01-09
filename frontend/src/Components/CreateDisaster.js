import React, { Component } from "react";
import { TextField, Button, Alert } from "@mui/material";
import axios from "axios";

class CreateDisaster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disaster: null,
      currentLat: null,
      currentLong: null,
    };
  }
  render() {
    return (
      <div className="loginContainer">
        <h1 className={"logInHeader"}>Create Disaster</h1>
        <TextField
          className="textField"
          variant="filled"
          placeholder="Disaster Type (Fire, Hurricane, Tornado)"
          value={this.state.disaster}
          required
          onChange={(evt) => {
            this.setState({ disaster: evt.target.value });
          }}
        />
        <TextField
          className="textField"
          variant="filled"
          placeholder="Latitude"
          value={this.state.currentLat}
          required
          onChange={(evt) => {
            this.setState({ currentLat: evt.target.value });
          }}
        />
        <TextField
          className="textField"
          variant="filled"
          placeholder="Longitude"
          value={this.state.currentLong}
          required
          onChange={(evt) => {
            this.setState({ currentLong: evt.target.value });
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
            axios
              .post("/disaster/createDisaster", this.state)
              .then((res) => {
                this.setState({
                  error: false,
                });
                window.open("/disasterMap", "_self");
              })
              .catch((err) => {
                console.log(err);
                this.setState({
                  error: err.response.data,
                });
              });
          }}
        >
          Report Disaster
        </Button>
      </div>
    );
  }
}

export default CreateDisaster;
