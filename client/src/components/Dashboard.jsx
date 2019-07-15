import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Dashboard extends Component {
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
        <h1>This is Dashboard</h1>
        <br />
        <br />
        <Link to="/profile">Profile</Link>
        <br />
        <br />
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
