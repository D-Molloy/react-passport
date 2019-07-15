import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom"; used history instead of redirect
class Profile extends Component {
  state = {
    name: "",
    about: "",
    email: ""
  };
  componentDidMount() {
    const isAuthenticated = window.localStorage.getItem("isAuthenticated");
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      this.props.history.push("/login");
    }

    // get user info
    axios.get("/auth/api").then(data => {
      this.setState({
        name: data.data.user.username,
        email: data.data.user.email,
        about: data.data.user.about
      });
    });
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
      <div style={styles.loginContainer}>
        <h1>This is Profile</h1>
        <p>Welcome, {this.state.name}</p>
        <p>{this.state.about}</p>
        <p>{this.state.email}</p>
        <br />
        <br />
        <Link to="/dashboard">Dashboard</Link>
        <br />
        <br />

        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

const styles = {
  loginContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "Center"
  }
};

export default Profile;
