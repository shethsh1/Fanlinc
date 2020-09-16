import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import { Nav, NavItem, NavLink, Button, Form } from 'reactstrap';
import axios from 'axios';
import { NavLink as RRNavLink } from 'react-router-dom';
import shortid from 'shortid';
import dotenv from 'dotenv';

import '../CSS-FOLDER/home.css'
import '../CSS-FOLDER/SearchBar.css'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE

class Home extends Component {


  constructor(props) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    super(props);
    this.state = {
      myFandoms: [],
      fandomId: myParam,
      fandomInfo: [],
      postInfo: [],
      searchQuery: ''

    };
    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/")
    }

    this.refreshId = this.refreshId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);






  }


  getPostInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')


    axios.get(`${API_HOST_URL}/getPost/` + myParam)
      .then((response) => {
        this.setState({ postInfo: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });



  }


  getFandomInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')


    axios.get(`${API_HOST_URL}/getGenreAndFandom/` + myParam)
      .then((response) => {
        this.setState({ fandomInfo: response.data })
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  refreshId(event) {
    this.props.history.push("/Home?fandomId=" + event.target.id)
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    this.setState({ fandomId: myParam });
    this.getFandomInfo();
    this.getPostInfo();


  }

  getMyFandoms() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')

    axios.get(`${API_HOST_URL}/getMyFandoms/` + localStorage.getItem('id'))
      .then((response) => {
        this.setState({ myFandoms: response.data });
        let found = false
        for (let i = 0; i < this.state.myFandoms.length; i++) {
          if (this.state.myFandoms[i]['value'] === Number(myParam)) {
            found = true;
          }
        }
        if (found === false) {
          this.props.history.push("/Home");
          if (this.state.fandomId !== null) {
            window.location.reload();
          }
        }



      })
      .catch(function (error) {
        console.log(error);

      });
  }







  componentDidMount() {
    this.getMyFandoms();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    if (myParam !== null) {
      this.getFandomInfo();
      this.getPostInfo();
    }
  }

  componentDidUpdate(newProps) {
    if (this.props.location !== newProps.location) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('fandomId')
      console.log(myParam);
      if (myParam === null) {
        this.setState({ fandomInfo: [] });
        this.setState({ postInfo: [] });
      }

    }
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }



  viewProfile = (event) => {
    this.props.history.push("/Profile?user=" + event.target.id);

  }



  viewPost = (event) => {
    this.props.history.push("/Home/Post?postId=" + event.target.id + "&fandomId=" + this.state.fandomId)
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.searchQuery);
    if (this.state.searchQuery === '') {
      this.getPostInfo();
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')

    axios.get(`${API_HOST_URL}/getPost/` + myParam + "/" + this.state.searchQuery)
      .then((response) => {
        this.setState({ postInfo: response.data });




      })
      .catch(function (error) {
        console.log(error);

      });



  }




  render() {

    const fandomId = this.state.fandomId;
    const MyFandoms = this.state.myFandoms.map(o =>
      <NavItem key={o.name} id="navi">
        <NavLink className="text-center" href="#" onClick={this.refreshId} id={o.value} >{o.name}</NavLink>
      </NavItem>
    );

    const fandomInfo = this.state.fandomInfo.map(o =>
      <span key={o.name}>
        <h1>{o.name}</h1>
        <h6>Genre: {o.genre}</h6>

        <div className="searchdiv">
          <Form onSubmit={this.handleSubmit}>
            <input type="text" id="searchQuery" onChange={this.handleChange} value={this.state.searchQuery} placeholder="Search" ></input>
            <button type="submit"><i className="fa fa-search" id="search-pads"></i></button>

          </Form>
        </div>

      </span>


    );








    const postInfo = this.state.postInfo.map(o =>

      <span key={shortid.generate()}>
        <div>
          <NavLink href="#" id={o.postId} onClick={this.viewPost}>{o.title}</NavLink>
          <NavLink href="#" id={o.userId} onClick={this.viewProfile}>Created by: {o.name}</NavLink>
          <small>Level {o.level}</small>
          <hr />
        </div>
      </span>


    );


    return (
      <div id="home">

        <NavigationBar />

        <div className="container_rest">
          <div className="containers">
            <div className="all_info">

              <div className="text-center">

                <h3>Fandom Page</h3>

                <Nav id="navi">
                  {MyFandoms}
                </Nav>




                {fandomId != null ?
                  <NavLink to={"/Home/CreatePost?fandomId=" + fandomId} exact activeClassName="current" tag={RRNavLink}>
                    <Button>Create A post </Button>
                  </NavLink>
                  : null
                }



                <hr />

                {fandomInfo}

                {postInfo}
              </div>
            </div>

          </div>
        </div>



      </div>
    );
  }
}


export default Home;