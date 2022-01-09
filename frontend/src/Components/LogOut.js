import React, { Component } from "react";
import axios from "axios";

class LogOut extends Component {
  componentDidMount() {
    axios
      .post("/account/logout")
      .then(() => window.open("/login", "_self"))
      .catch((err) => {
        window.open("/disasterMap");
      });
  }
  render() {
    return <div></div>;
  }
}

export default LogOut;
