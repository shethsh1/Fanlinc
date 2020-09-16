import React, { Component } from "react";
import axios from 'axios';
import './Login.css'
import dotenv from 'dotenv'
import '../CSS-FOLDER/FandomPageBar.css'
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import { Route, withRouter } from 'react-router-dom';
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE

const errorStyle = {
  color: "red"
}

class FandomPageBar extends Component {


  constructor(props) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    super(props);
    this.state = {
      myFandoms: [],
      fandomId: myParam,
      fandomInfo: [],
      postInfo: []

    };
    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/")
    }

    this.refreshId = this.refreshId.bind(this);
  }


  refreshId(event) {
    console.log(event.target.id);
    this.props.history.push("/Home?fandomId=" + event.target.id)
  }





  getMyFandoms() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')

    axios.get(`${API_HOST_URL}/getMyFandoms/` + localStorage.getItem('id'))
      .then((response) => {
        this.setState({ myFandoms: response.data });
        if (myParam) {
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
        }



      })
      .catch(function (error) {
        console.log(error);

      });
  }


  componentDidMount() {
    this.getMyFandoms();
  }




  render() {
    const MyFandoms = this.state.myFandoms.map(o =>

      <div class="sidebarFandom" key={o.name}>
        <NavLink href="#" onClick={this.refreshId} id={o.value}>{o.name}</NavLink>
      </div>

    );
    return (
      <div>
        <div class="sidebar">
          <h2>Fandom</h2>

          {MyFandoms}

        </div>


      </div>


    );
  }
}

export default withRouter(FandomPageBar);
