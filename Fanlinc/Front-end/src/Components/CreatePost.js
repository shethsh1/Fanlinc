import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import { Button, Form } from 'reactstrap';
import axios from 'axios';
import '../CSS-FOLDER/post.css'
import dotenv from 'dotenv';
import FandomPageBar from './FandomPageBar';
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE;


dotenv.config();

const errorStyle = {
  color: "red"
}


class CreatePost extends Component {

  constructor(props) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    super(props);
    this.state = {
      myFandoms: [],
      title: '',
      post: '',
      fandomId: myParam,
      fandomName: '',
      error: ""
    };






    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/")
    }

    if (myParam === null) {
      this.props.history.push("/Home");
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.title);
    console.log(this.state.post);


    axios.put(`${API_HOST_URL}/MakePost`,
      {
        "userId": localStorage.getItem('id'),
        "postTitle": this.state.title,
        "postDescription": this.state.post,
        "fandomId": this.state.fandomId
      })
      .then((response) => {
        if (response.data.status === 200) {
          console.log("reached here")
          this.props.history.push("/Home?fandomId=" + this.state.fandomId);
        } else {
          this.setState({ error: response.data.msg })
        }


      })
      .catch(function (error) {
        console.log(error);

      });

    event.preventDefault();

  }





  componentDidMount() {
    axios.get(`${API_HOST_URL}/getMyFandoms/` + localStorage.getItem('id'))
      .then((response) => {
        this.setState({ myFandoms: response.data })
        let found = false
        for (let i = 0; i < this.state.myFandoms.length; i++) {
          if (this.state.myFandoms[i]['value'] === Number(this.state.fandomId)) {
            this.setState({ fandomName: this.state.myFandoms[i]['name'] });
            found = true;
          }
        }
        if (found === false) {
          this.props.history.push("/Home");
        }


      })
      .catch(function (error) {
        console.log(error);

      });

  }



  render() {

    const fandomName = this.state.fandomName;
    const error = this.state.error;



    return (
      <div id="create-post">

        <NavigationBar />
        <div className="container_rest">
          <div className="containers">
            <div className="all_info text-center">
              <h3>Create Post</h3>
              <h6>{fandomName}</h6>

              <Form onSubmit={this.handleSubmit}>

                <h4>Title</h4>
                <textarea id="title" name="text" onChange={this.handleChange} maxLength="250"></textarea>

                <h4>Text</h4>
                <textarea id="post" name="text" maxLength="5000" onChange={this.handleChange}></textarea> <br />

                <Button className="btn btn-primary" type="submit" >Create</Button>
              </Form>

              <span id="Error" style={errorStyle}>{error}</span>


            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default CreatePost;