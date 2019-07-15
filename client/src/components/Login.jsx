import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: false,
    message: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: false, message: "" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      axios
        .post("/auth/signin", {
          email,
          password
        })
        .then(response => {
          const isAuthenticated = response.data.isAuthenticated;
          window.localStorage.setItem("isAuthenticated", isAuthenticated);
          this.setState({ error: false, message: "" });
          // TODO: Add user info to localstorage
          // login was successful
          this.props.history.push("/profile");
        })
        .catch(err => {
          console.log(err.response);
          this.setState({ error: true, message: err.response.data.error });
        });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const errorMessage = this.state.message || "Please Try Again";

    const isAuthenticated = window.localStorage.getItem("isAuthenticated");

    if (isAuthenticated) {
      return <Redirect to="/profile" />;
    }
    return (
      <div style={styles.loginContainer}>
        <h2>Login:</h2>
        <form onSubmit={this.handleSubmit} style={styles.loginContainer}>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="email@email.com"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <button>Login</button>
          {this.state.error ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : null}
        </form>
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

export default Login;
