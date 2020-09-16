import React, { Component } from "react";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Login.css'
import dotenv from 'dotenv'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE

const errorStyle = {
  color: "red"
}

class login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };



    if (localStorage.getItem('loggedin') === 'true') {
      this.props.history.push("/Home")
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    axios.post(`${API_HOST_URL}/validateAccount`, {
      "email": this.state.email,
      "password": this.state.password
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.msg === 'success') {
          localStorage.setItem('loggedin', 'true');
          localStorage.setItem('email', this.state.email);
          localStorage.setItem('id', response.data.id);

          this.props.history.push("/Profile?user=" + localStorage.getItem('id'));

        } else {
          this.setState({ error: response.data.msg })
        }

      })
      .catch(function (error) {
        console.log(error);

      });
    event.preventDefault();
  }




  render() {
    const errorMessage = this.state.error;
    return (
      <div id="bar" className="bg">

        <form className="form" onSubmit={this.handleSubmit}>
          <h1>Login</h1>





          <div className="location">
            <input id="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" />          </div>

          <div className="login">
            <div className="userpass">
              <input id="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
            </div>
          </div>


          <button className="btn" type="submit"> Login</button>
          <NavLink to="/SignUp">Don't have an account?</NavLink>
          <div id="Error" className="Message" style={errorStyle}>{errorMessage}</div>

        </form>










      </div>


    );
  }
}

export default login;
