import React, { Component } from "react";
import axios from 'axios';
import './style.css'
import { NavLink } from 'react-router-dom';
import dotenv from 'dotenv'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE

const errorStyle = {
  color: "red"
}

const successStyle = {
  color: "green"
}

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      vendor: false,
      cosplayer: false,
      success: null,
      fail: null

    };

    if (localStorage.getItem('loggedin') === 'true') {
      this.props.history.push("/Home")
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleCheckBox(e) {
    let isChecked = e.target.checked;
    this.setState({ [e.target.id]: isChecked });
  }

  handleSubmit(event) {

    axios.put(`${API_HOST_URL}/createAccount`, {
      "name": this.state.name,
      "email": this.state.email,
      "password": this.state.password,
      "confirmPassword": this.state.confirmPassword,
      "vendor": this.state.vendor,
      "cosplayer": this.state.cosplayer,
      "first_name": this.state.firstName,
      "last_name": this.state.lastName

    })
      .then((response) => {
        console.log(response.data);
        if (response.data === "Success") {
          this.props.history.push("/");
          this.setState({ success: response.data })
          this.setState({ error: null })

        } else {
          this.setState({ success: null })
          this.setState({ error: response.data })

        }


      })
      .catch(function (error) {
        console.log(error);

      });


    event.preventDefault();
  }



  render() {
    const success = this.state.success;
    const error = this.state.error;

    return (

      <div id="foo" className="bg">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1>Register</h1>


          <div className="name">
            <input id="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} placeholder="First name" />
            <input id="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} placeholder="Last name" />
          </div>


          <div className="location">
            <input id="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" />
            <input id="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Display name" />
          </div>

          <div className="login">
            <div className="userpass">
              <input id="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
              <input id="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Re-enter Password" />
            </div>
          </div>

          <p>Optional Roles: </p>
          <div className="roles">
            <input type="checkbox" id="vendor" onClick={this.handleCheckBox} /> Vendor
            <input type="checkbox" id="cosplayer" onClick={this.handleCheckBox} /> Cosplayer
          </div>
          <button className="btn" type="submit"> Register</button>
          <NavLink to="/">Already Registered?</NavLink>
          <div id="Error" className="Message" style={errorStyle}>{error}</div>
          <div id="Success" className="Message" style={successStyle}>{success}</div>
        </form>





      </div>
    );
  }
}

export default SignUp;
