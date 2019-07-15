import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class Dashboard extends Component {
  state = {
    name: "",
    about: "",
    email: ""
  };

  componentDidMount() {
    // get user info // or could have stored in local storage
    axios
      .get("/auth/api")
      .then(res => {
        console.log(res);
        // cookies present when request made ? res.data==user : res.data={}
        console.log(Object.entries(res.data).length === 0);
        if (Object.entries(res.data).length === 0) {
          this.logout();
        }

        this.setState({
          name: res.data.user.username,
          email: res.data.user.email,
          about: res.data.user.about
        });
      })
      .catch(err => this.logout());
  }
  logout = () => {
    axios
      .get("/auth/logout")
      .then(data => {
        window.localStorage.removeItem("isAuthenticated");
        this.props.history.push("/login");
      })
      .catch(err => this.props.history.push("/login"));
  };

  render() {
    return (
      <div>
        <h1>This is Dashboard</h1>
        <p>Welcome, {this.state.name}</p>
        <p>{this.state.about}</p>
        <p>{this.state.email}</p>
        <br />
        <br />
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
