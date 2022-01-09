import React, { Component } from "react";
import logo from "../pinecone.png";
import { AppBar, Toolbar } from "@mui/material";
import axios from "axios";

import "./Navbar.css";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  componentDidMount() {
    axios.get("/account/isLoggedIn").then((res) => {
      this.setState({ isLoggedIn: res.data.msg });
    });
  }
  render() {
    return (
      <div>
        <AppBar
          style={{
            background: "#FF7700",
            color: "black",
            height: "100px",
            flexDirection: "row",
            display: "flex",
            justifyContent: "flex-end",
          }}
          position="static"
        >
          <Toolbar variant="dense">
            <img
              src={logo}
              className="logo"
              onClick={() => window.open("/", "_self")}
            />

            <div className="accountDiv">
              <h1
                className="loginText"
                onClick={() => window.open("/login", "_self")}
              >
                Log In
              </h1>
              <h1
                className="signupText"
                onClick={() => window.open("/signup", "_self")}
              >
                Sign Up
              </h1>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
