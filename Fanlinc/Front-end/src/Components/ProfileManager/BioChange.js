import React, { Component } from "react";
import axios from 'axios';
import NavigationBar from '../NavigationBar'
import '../../CSS-FOLDER/biography.css'
import { Button } from 'reactstrap';
import dotenv from 'dotenv'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE


const errorStyle = {
  color: "red"
}

const successStyle = {
  color: "green"
}

class BioChange extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem('email'),
      id: localStorage.getItem('id'),
      loading: false,
      newname: '',
      success: '',
      error: '',
      password: '',
      bio: ''


    };





    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/Home")
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);



  }

  componentDidMount() {

    console.log(this.state.id);
    axios.get(`${API_HOST_URL}/getProfile/` + this.state.id)
      .then((response) => {
        this.setState({ bio: response.data.bio });
        this.setState({ loading: false });
      })
      .catch(function (error) {
        console.log(error);

      });

  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    axios.post(`${API_HOST_URL}/profile/changeBio`, {
      "email": this.state.email,
      "bio": this.state.bio
    })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Success') {

          this.setState({ error: '' })
          this.setState({ success: response.data })
          if (response.data != null) {
            this.setState({ bio: this.state.bio })
          }
          this.goBack();


        } else {
          this.setState({ error: response.data })
          this.setState({ success: '' })
        }

      })
      .catch(function (error) {
        console.log(error);

      });
    event.preventDefault();

  }




  goBack = () => {
    this.props.history.goBack();
  }





  render() {

    if (!this.state.loading) {
      const error = this.state.error;
      const success = this.state.success;
      const bio = this.state.bio;


      return (



        <div id="set-bio">


          < NavigationBar />
          <div className="container_rest">
            <div className="containers">
              <div className="all_info">
                <h1 className="text-center">Bio Change</h1>

                <label>


                  <br />
                  <p>{bio}</p>

                </label> <br />



                <form className="text-center" onSubmit={this.handleSubmit}>

                  <textarea id="bio" value={this.state.bio} name="text" maxLength="5000" onChange={this.handleChange}></textarea> <br />

                  <Button className="btn btn-primary" type="submit" >Submit</Button>
                  <Button onClick={this.goBack}>Cancel</Button>
                  <div id="success" style={successStyle}>{success}</div>
                  <div id="error" style={errorStyle}>{error}</div>



                </form>













              </div>





            </div>
          </div>



        </div >


      );
    } else {
      return ("loading");
    }
  }
}

export default BioChange;
