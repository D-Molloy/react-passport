import React, { Component } from "react";
import { Link } from "react-router-dom";
class Home extends Component {
  render() {
    return (
      <div style={styles.loginContainer}>
        <h1>This is Home</h1>
        <Link to="/login">Login</Link>
        <br />
        <br />
        <Link to="/signup">Signup</Link>
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

export default Home;
