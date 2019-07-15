import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
class Profile extends Component {
  componentDidMount() {
    const isAuthenticated = window.localStorage.getItem("isAuthenticated");
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  logout = () => {
    axios
      .get("/auth/logout")
      .then(data => {
        window.localStorage.removeItem("isAuthenticated");
        this.props.history.push("/login");
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>This is Profile</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Profile;
