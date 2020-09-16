import React, { Component } from 'react';
import NavigationBar from '../NavigationBar'
import { Nav, NavItem, NavLink, Button } from 'reactstrap';
import axios from 'axios';

import { NavLink as RRNavLink } from 'react-router-dom';
import shortid from 'shortid';
import dotenv from 'dotenv';
import '../../CSS-FOLDER/collection.css'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE



class collections extends Component {

  constructor(props) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('userId')
    super(props);

    this.state = {
      collage: [],
      item_image: '',
      realUser: false

    };


    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/")
    }



    if (myParam === null) {
      this.props.history.push("/")
    }


    this.openDialog = this.openDialog.bind(this);

  }

  uploadImage = e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'nri7mjuk')
    axios.post(
      'https://api.cloudinary.com/v1_1/dzuvioe6w/image/upload', data
    )
      .then((response) => {
        this.setState({ item_image: response.data.secure_url });


        axios.put(`${API_HOST_URL}/profile/addImage`, {
          "userId": localStorage.getItem('id'),
          "image": response.data.secure_url
        })
          .then((response) => {
            if (response.status === 200) {
              this.getPage();
            }


          })
          .catch(function (error) {
            console.log(error);

          });





      });


  }


  openDialog = () => {

    document.getElementById('fileid').click();
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId')
    if (localStorage.getItem('id') === userId) {
      this.setState({ realUser: true });
      document.getElementById('buttonid').addEventListener('click', this.openDialog);
    }
    this.getPage();

  }

  getPage() {

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId')

    axios.get(`${API_HOST_URL}/profile/getImage/` + userId)
      .then((response) => {
        this.setState({ collage: response.data });
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);

      });




  }

  render() {


    const getPage = this.state.collage.map(o =>

      <div className="picture text-center" key={o.cosplayerId}>
        <img className="text-center" src={o.image} alt="oops"></img>
      </div>

    );

    const realUser = this.state.realUser;



    return (
      <div id="collection">




        <NavigationBar />

        <div className="container_rest">
          <div className="containers">
            <div className="all_info">
              <div className="collections text-center">

                <h1>Collections</h1>

                {realUser ?


                  <span>
                    <input id='fileid' type='file' hidden onChange={this.uploadImage} />
                    <button id='buttonid' type='button' value='Upload' ><i className="fa fa-camera"></i>Upload</button>
                  </span>

                  :

                  <span>
                    <input id='fileid' type='file' hidden onChange={this.uploadImage} />
                    <button id='buttonid' type='button' value='Upload' hidden ><i className="fa fa-camera"></i>Upload</button>
                  </span>

                }


                <span className="text-center">
                  {getPage}
                </span>



              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default collections;
