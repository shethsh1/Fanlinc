import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import axios from 'axios';
import shortid from 'shortid';
import { Form } from 'reactstrap';
import dotenv from 'dotenv';
import '../CSS-FOLDER/postview.css'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE

const errorStyle = {
  color: "red"
}

const successStyle = {
  color: "green"
}

const cursor = {
  cursor: "pointer"
}

const bold = {
  fontWeight: "bold",
  textAlign: 'center'
}


class postview extends Component {

  constructor(props) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParamFandom = urlParams.get('fandomId');
    const myParamPost = urlParams.get('postId');


    super(props);
    this.state = {
      originalPoster: [],
      currComment: '',
      error: null,
      success: null,
      allComments: []
    };

    if (myParamPost == null || myParamFandom == null) {
      this.props.history.push("/Home")
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearData = this.clearData.bind(this)
  }



  getPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParamFandom = urlParams.get('fandomId');
    const myParamPost = urlParams.get('postId');
    axios.get(`${API_HOST_URL}/getThisPost/` + myParamFandom + '/' + myParamPost)
      .then((response) => {
        this.setState({ originalPoster: response.data });
      })
      .catch(function (error) {
        console.log(error);

      });
  }


  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }


  check() {
    const urlParams = new URLSearchParams(window.location.search);



  }



  componentDidMount() {
    this.getPost();
    this.getComments();
  }

  viewProfile = (event) => {
    this.props.history.push("/Profile?user=" + event.target.id);
  }

  handleSubmit(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParamFandom = urlParams.get('fandomId');
    const myParamPost = urlParams.get('postId');
    axios.post(`${API_HOST_URL}/createComment`, {
      "userId": localStorage.getItem('id'),
      "postId": myParamPost,
      "fandomId": myParamFandom,
      "comment": this.state.currComment
    })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({ error: null });
          this.setState({ success: response.data.msg });
          this.clearData();
          this.getComments();
        } else {
          this.setState({ success: null })
          this.setState({ error: response.data.msg });

        }

      })
      .catch(function (error) {
        console.log(error);

      });
    event.preventDefault();
  }


  clearData() {
    this.setState({
      currComment: ''
    });

  }


  getComments() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParamFandom = urlParams.get('fandomId');
    const myParamPost = urlParams.get('postId');
    axios.get(`${API_HOST_URL}/getComments/` + myParamFandom + '/' + myParamPost)
      .then((response) => {
        this.setState({
          allComments: response.data
        });

      })
      .catch(function (error) {
        console.log(error);

      });

  }










  render() {

    const originalPoster = this.state.originalPoster.map(o =>
      <div className="comments" key={shortid.generate()}>
        <div className="list-comments">
          <div>
            <span style={bold}>Title: {o.title}</span>
            <p><span style={cursor} className="username" id={o.userId} onClick={this.viewProfile}>By: {o.name}</span></p>
            <p>{o.description}</p>

          </div>
        </div>

      </div>



    );

    const success = this.state.success;
    const error = this.state.error;

    const allComments = this.state.allComments.map(o =>
      <div key={shortid.generate()}>
        <p><span style={cursor} id={o.userId} onClick={this.viewProfile} className="username">{o.name}</span></p>
        <p id={o.commentId}>{o.comment}</p>

      </div>

    );



    return (
      <div id="allview">

        <NavigationBar />

        <div className="container_rest">
          <div className="all_info">


            {originalPoster}


            <div className="comments">
              <h1>Comments</h1>
              <Form onSubmit={this.handleSubmit}>
                <textarea id="currComment" placeholder="Share your thoughts..." className="comment-content" maxLength="1000" value={this.state.currComment} onChange={this.handleChange}></textarea>
                <div className="insert-text">
                  <div className="comment-as">
                    <span style={errorStyle}>{error}</span>
                    <span style={successStyle}>{success}</span>
                    <span>
                      <input className="btn btn-primary" type="submit" value="Create" />
                    </span>
                  </div>
                </div>
              </Form>
              <div className="list-comments">
                {allComments}

              </div>
            </div>

          </div>

        </div>










      </div>
    );
  }
}


export default postview;