import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    message: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: false, message: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      axios
        .post('/auth/signup', {
          email,
          password
        })
        .then(response => {
          // login was successful
          console.log('response.data', response.data);
          const isAuthenticated = response.data.isAuthenticated;
          window.localStorage.setItem('isAuthenticated', isAuthenticated);
          if (isAuthenticated) {
            this.props.history.push('/profile');
          }
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
    return (
      <div style={styles.loginContainer}>
        <h2>Signup:</h2>
        <form onSubmit={this.handleSubmit} style={styles.loginContainer}>
          <label htmlFor='email'>Email:</label>
          <input
            type='text'
            name='email'
            placeholder='email@email.com'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <button>Login</button>
        </form>
        {this.state.error ? (
          <p style={{ color: 'red' }}>'Please Try Again'</p>
        ) : null}
      </div>
    );
  }
}
const styles = {
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
};
export default Signup;
