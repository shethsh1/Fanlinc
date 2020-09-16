import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import axios from 'axios';
import { Button, Form } from 'reactstrap';
import '../CSS-FOLDER/addfandom.css'
import dotenv from 'dotenv'
import '../CSS-FOLDER/SearchBar.css'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE


const errorStyle = {
  color: "red"
}

const successStyle = {
  color: "green"
}

class InsertFandom extends Component {
  constructor(props) {
    super(props);
    this.state = {

      genre: null,
      fandomName: '',
      joinFandom: null,
      level: null,
      success: '',
      error: '',
      allFandoms: [],
      joinError: '',
      joinSucceess: '',
      myFandoms: [],
      searchQuery: '',
      searchQueryMyFandoms: ''


    };
    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/")
    }

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSearchFandoms = this.handleSearchFandoms.bind(this);
    this.handleSearchMyFandoms = this.handleSearchMyFandoms.bind(this);

    this.handleJoin = this.handleJoin.bind(this);
  }


  getFandoms() {



    axios.get(`${API_HOST_URL}/getFandoms/` + localStorage.getItem('id'))
      .then((response) => {
        this.setState({ allFandoms: response.data })


      })
      .catch(function (error) {
        console.log(error);

      });
  }


  getMyFandoms() {

    axios.get(`${API_HOST_URL}/getMyFandoms/` + localStorage.getItem('id'))
      .then((response) => {
        this.setState({ myFandoms: response.data })
        console.log(this.state.myFandoms);


      })
      .catch(function (error) {
        console.log(error);

      });
  }


  componentDidMount() {
    this.getFandoms();
    this.getMyFandoms();
  }




  handleSelect(event) {
    this.setState({ [event.target.id]: event.target.value || null });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }


  handleSubmit(event) {
    axios.put(`${API_HOST_URL}/createFandom`, {
      'name': this.state.fandomName,
      'genre': this.state.genre
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          this.setState({ success: response.data.msg });
          this.setState({ error: null })
          this.getFandoms();
          this.getMyFandoms();

        } else {
          this.setState({ error: response.data.msg });
          this.setState({ success: null })
        }

      })
      .catch(function (error) {
        console.log(error);

      });

    event.preventDefault();

  }



  handleJoin(event) {
    axios.post(`${API_HOST_URL}/updateFandom`, {
      'userId': localStorage.getItem('id'),
      'name': this.state.joinFandom,
      'level': this.state.level
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === 200) {
          this.setState({ joinSuccess: response.data.msg });
          this.setState({ joinError: null })
          this.getFandoms();
          this.getMyFandoms();

        } else {
          this.setState({ joinError: response.data.msg });
          this.setState({ joinSuccess: null })
        }

      })
      .catch(function (error) {
        console.log(error);

      });


    event.preventDefault();

  }


  handleDelete(event) {
    axios.post(`${API_HOST_URL}/removeFandoms`, {
      'fandomName': event.target.value,
      'userId': localStorage.getItem('id')
    })
      .then((response) => {
        if (response.data === "Success") {
          this.getFandoms();
          this.getMyFandoms();
        }
      })
      .catch(function (error) {
        console.log(error);

      });


    event.preventDefault();

  }


  handleSearchFandoms(event) {
    event.preventDefault();
    if (this.state.searchQuery === '') {
      this.getFandoms();
      return;
    }


    axios.get(`${API_HOST_URL}/getFandoms/` + localStorage.getItem('id') + "/" + this.state.searchQuery)
      .then((response) => {
        this.setState({ allFandoms: response.data });

      })
      .catch(function (error) {
        console.log(error);

      });
  }


  handleSearchMyFandoms(event) {
    event.preventDefault();
    if (this.state.searchQueryMyFandoms === '') {
      this.getMyFandoms();
      return;
    }


    axios.get(`${API_HOST_URL}/getMyFandoms/` + localStorage.getItem('id') + "/" + this.state.searchQueryMyFandoms)
      .then((response) => {
        this.setState({ myFandoms: response.data });
        console.log(this.state.getMyFandoms);

      })
      .catch(function (error) {
        console.log(error);

      });
  }


  render() {

    const success = this.state.success;
    const error = this.state.error;
    const joinSuccess = this.state.joinSuccess;
    const joinError = this.state.joinError;
    const allFandoms = this.state.allFandoms.map(o => <option key={o.name} value={o.value}>{o.name}</option>);
    const myFandoms = this.state.myFandoms.map(o => <p className="text-center" key={o.name}><Button value={o.value} color="danger" onClick={this.handleDelete}>{o.name}</Button></p>);

    return (
      <div id="addFandom">

        <NavigationBar />
        <div className="container_rest">
          <div className="containers">
            <div className="all_info">

              <div className="adding text-center" >
                <form className="form text-center" onSubmit={this.handleSubmit}>

                  <div className="create-name"><h6>Create Fandom </h6></div>

                  <select id="genre" value={this.state.genre || ''} onChange={this.handleSelect}>
                    <option value="">Choose Genre</option>
                    <option value="Music">Music</option>
                    <option value="Sports">Sports</option>
                    <option value="Games">Games</option>
                    <option value="Anime">Anime</option>
                    <option value="Celebrity">Celebrity</option>
                  </select>


                  <input id="fandomName" type="text" value={this.state.fandomName} onChange={this.handleChange} placeholder="Fandom name" />


                  <br />

                  <button id="btn-success" type="submit" className="btn btn-success button-fandom">Create</button>

                </form>


                <span style={errorStyle}>{error} </span>
                <span style={successStyle}>{success} </span>

              </div>



              <div className="joining" >

                <h6>Join a fandom</h6>

                <div className="searchdiv" style={{ justifyContent: "center" }}>
                  <Form onSubmit={this.handleSearchFandoms} style={{ marginTop: "3px" }}>
                    <input type="text" id="searchQuery" onChange={this.handleChange} value={this.state.searchQuery} placeholder="Search" ></input>
                    <button type="submit"><i className="fa fa-search" id="search-pads"></i></button>

                  </Form>
                </div>


                <form className="form" onSubmit={this.handleJoin}>




                  <select id="joinFandom" value={this.state.joinFandom || ''} onChange={this.handleSelect}>
                    <option value=''>Choose Fandom</option>
                    {allFandoms}

                  </select>

                  <select className="levels-fandom" id="level" value={this.state.level || ''} onChange={this.handleSelect}>
                    <option value=''  >Choose level</option>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                    <option value="4">Level 4</option>
                  </select>


                  <br />


                  <button id="btn-success" type="submit" className="btn btn-success button-fandom">Add</button>


                </form>

                <span style={errorStyle}>{joinError} </span>
                <span style={successStyle}>{joinSuccess} </span> <br />

              </div>
              <div className="joining text-center" >
                <h6>Current Fandoms</h6>

                <div className="searchdiv" style={{ justifyContent: "center" }}>
                  <Form onSubmit={this.handleSearchMyFandoms} style={{ marginTop: "3px" }}>
                    <input type="text" id="searchQueryMyFandoms" onChange={this.handleChange} value={this.state.searchQueryMyFandoms} placeholder="Search" ></input>
                    <button type="submit"><i className="fa fa-search" id="search-pads"></i></button>

                  </Form>
                </div>

                {myFandoms}

              </div>

            </div>

          </div>

        </div>






      </div>
    );
  }
}


export default InsertFandom;
