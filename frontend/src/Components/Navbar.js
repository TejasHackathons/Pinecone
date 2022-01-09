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
            <div className={"navbarContainer"}>
              <img
                src={logo}
                className="logo"
                onClick={() => window.open("/", "_self")}
              />
              <div className="accountDiv">
                <h1
                  className="loginText"
                  onClick={() =>
                    window.open(
                      this.state.isLoggedIn ? "/disasterMap" : "/login",
                      "_self"
                    )
                  }
                >
                  {this.state.isLoggedIn ? "Disaster Map" : "Log In"}
                </h1>
                <h1
                  className="createDisasterText"
                  onClick={() =>
                    window.open(
                      this.state.isLoggedIn ? "/createDisaster" : null,
                      "_self"
                    )
                  }
                >
                  {this.state.isLoggedIn ? "Report Disaster" : null}
                </h1>
                <h1
                  className="logoutText"
                  onClick={() =>
                    window.open(
                      this.state.isLoggedIn ? "/logout" : "/signup",
                      "_self"
                    )
                  }
                >
                  {this.state.isLoggedIn ? "Log Out" : "Sign Up"}
                </h1>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
