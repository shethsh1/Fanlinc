import React, { Component } from 'react';
import NavigationBar from '../NavigationBar'
import '../../CSS-FOLDER/ProfilePage.css'
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE


const textBigger = {
  fontSize: "30px"
}

const textBold = {
  fontSize: "20px",
  fontWeight: 'bold',
  marginLeft: "30px"
}

const normal = {
  fontWeight: 'normal'
};



const bold = {
  fontWeight: 'bold',
}


function isEmpty(ob) {
  for (var i in ob) { return false; }
  return true;
}



class ProfilePage extends Component {

  constructor(props) {

    super(props);

    this.state = {
      error: '',
      image: '',
      hideName: true,
      hideFirstName: true,
      hideLastName: true,
      hideEmail: true,
      editPersonalInfo: '',
      loading: false,
      realUser: false,


      name: '',
      bio: '',
      email: '',
      firstName: '',
      lastName: '',
      vendor: null,
      cosplayer: null


    };


    this.openDialog = this.openDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showDisplayName = this.showDisplayName.bind(this);
    this.handleDisplayName = this.handleDisplayName.bind(this);
    this.showFirstName = this.showFirstName.bind(this);
    this.handleFirstName = this.handleFirstName.bind(this);

    this.showLastName = this.showLastName.bind(this);

    this.handleLastName = this.handleLastName.bind(this);
    this.cancel = this.cancel.bind(this);
    this.showEmail = this.showEmail.bind(this);

    this.Cosplayer = this.Cosplayer.bind(this);
    this.Vendor = this.Vendor.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('user')
    axios.get(`${API_HOST_URL}/getProfile/` + myParam)
      .then((response) => {
        console.log("hi");
        this.setState({ name: response.data.name });
        this.setState({ bio: response.data.bio });
        console.log(response.data.image);
        if (response.data.image === null) {
          console.log("Reached here");
          this.setState({ image: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png" });
        } else {
          this.setState({ image: response.data.image });
        }
        this.setState({ email: response.data.email });
        this.setState({ firstName: response.data.first_name });
        this.setState({ lastName: response.data.last_name });
        this.setState({ vendor: response.data.vendor });
        this.setState({ cosplayer: response.data.cosplayer });
        if (!isEmpty(response.data)) {
          this.setState({ loading: false });
        } else {
          this.props.history.push("/Profile?user=" + localStorage.getItem('id'));
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push("/Profile?user=" + localStorage.getItem('id'));


      });

  }

  componentDidUpdate(newProps) {
    if (this.props.location !== newProps.location) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('user')
      if (myParam === localStorage.getItem('id')) {
        console.log("raeached")
        this.setState({ user: myParam });
        this.setState({ realUser: true });
        this.getProfile();
      }

    }
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
        console.log(response.data.secure_url);
        this.setState({ image: response.data.secure_url });

        axios.post(`${API_HOST_URL}/setImage`, {
          "email": localStorage.getItem('email'),
          "image": this.state.image
        })
          .then((res) => {
            this.setState({ success: res.data })
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
    const myParam = urlParams.get('user')
    this.getProfile();
    document.getElementById('buttonid').addEventListener('click', this.openDialog);

    if (localStorage.getItem('id') === myParam) {
      this.setState({ realUser: true });
    }

  }


  showDisplayName() {
    if (this.state.hideFirstName !== false && this.state.hideLastName !== false && this.state.hideEmail !== false) {

      this.setState({ hideName: false });
    }
  }

  handleDisplayName(event) {

    console.log(this.state.editPersonalInfo);

    axios.post(`${API_HOST_URL}/profile/changeName`, {
      "user": localStorage.getItem('id'),
      "name": this.state.editPersonalInfo,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Success') {

          this.setState({ error: '' })
          this.setState({ hideName: true });
          this.setState({ editPersonalInfo: '' });
          this.getProfile();

        } else {
          this.setState({ error: response.data })
        }

      })
      .catch(function (error) {
        console.log(error);

      });
    event.preventDefault();

  }

  showEmail() {
    if (this.state.hideFirstName !== false && this.state.hideLastName !== false && this.state.hideName !== false) {
      this.setState({ hideEmail: false });
    }
  }

  showFirstName() {
    if (this.state.hideEmail !== false && this.state.hideLastName !== false && this.state.hideName !== false) {

      this.setState({ hideFirstName: false });
    }
  }


  handleFirstName(event) {

    console.log(this.state.editPersonalInfo);

    axios.post(`${API_HOST_URL}/profile/changeFirstName`, {
      "user": localStorage.getItem('id'),
      "name": this.state.editPersonalInfo,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Success') {

          this.setState({ error: '' })
          this.setState({ hideFirstName: true });
          this.setState({ editPersonalInfo: '' });
          this.getProfile();

        } else {
          this.setState({ error: response.data })
        }

      })
      .catch(function (error) {
        console.log(error);

      });
    event.preventDefault();

  }




  showLastName() {
    if (this.state.hideFirstName !== false && this.state.hideEmail !== false && this.state.hideName !== false) {

      this.setState({ hideLastName: false });
    }
  }


  handleLastName(event) {

    console.log(this.state.editPersonalInfo);

    axios.post(`${API_HOST_URL}/profile/changeLastName`, {
      "user": localStorage.getItem('id'),
      "name": this.state.editPersonalInfo,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data === 'Success') {

          this.setState({ error: '' })
          this.setState({ hideLastName: true });
          this.setState({ editPersonalInfo: '' });
          this.getProfile();

        } else {
          this.setState({ error: response.data })
        }

      })
      .catch(function (error) {
        console.log(error);

      });
    event.preventDefault();

  }


  cancel() {
    this.setState({ editPersonalInfo: '' });
    this.setState({ error: '' })
    this.setState({ hideLastName: true });
    this.setState({ hideEmail: true });
    this.setState({ hideName: true });
    this.setState({ hideFirstName: true });



  }


  Vendor(event) {



    axios.post(`${API_HOST_URL}/profile/toggleVendor`, {
      "user": localStorage.getItem('id'),
      "vendor": !this.state.vendor,
    })
      .then((response) => {
        console.log(response.data);
        this.getProfile();

      })
      .catch(function (error) {
        console.log(error);

      });
    event.preventDefault();

  }



  Cosplayer(event) {
    axios.post(`${API_HOST_URL}/profile/toggleCosplayer`, {
      "user": localStorage.getItem('id'),
      "cosplayer": !this.state.cosplayer,
    })
      .then((response) => {
        console.log(response.data);
        this.getProfile();

      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }

  goCosplayerPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('user')
    this.props.history.push("/Profile/cosplayer?userId=" + myParam);
  }


  goVendorPage = () => {
    this.props.history.push("/Profile/vendor");
  }

  changeBio = () => {
    this.props.history.push("/Profile/bio")
  }




  render() {


    if (!this.state.loading) {
      return (
        <div >

          < NavigationBar />




          <div className="container_rest">
            <div className="containers">

              <div className="all_info">


                <div className="main-raised">

                  <div className="text-center">

                    <input id='fileid' type='file' hidden onChange={this.uploadImage} />

                    {this.state.realUser ?

                      <img id='buttonid' value='Upload' className="avatar rounded-circle img-thumbnail editpencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />
                      :
                      <img id='buttonid' value='Upload' className="avatar rounded-circle img-thumbnail editpencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} hidden />

                    }

                    <img id="pfp-size" src={this.state.image} className="avatar rounded-circle img-thumbnail" width="150px" height="150px" alt="avatar" />
                  </div>

                </div>


                <p className="text-center" style={textBigger}>{this.state.name}</p>


                <p style={textBold}>Basic Information</p>
                <div className="row">


                  <div className="basic-info col-md-5">



                    <table class="table table-basic ">
                      <thead>
                      </thead>
                      <tbody>
                        <tr  >
                          <td id="table-pad" style={bold}>First Name</td>
                          <td id="table-pad" class="value-bar">

                            {!this.state.hideFirstName ?
                              <div>
                                <input name="editPersonalInfo" value={this.state.editPersonalInfo} onChange={this.handleChange} type="text" />
                                <input onClick={this.handleFirstName} type="submit" value="Change" />
                                <input onClick={this.cancel} type="submit" value="Cancel" />
                              </div>
                              :

                              <div className="value-align">
                                <span className="value-float">
                                  {this.state.firstName}
                                </span>

                                {this.state.realUser ?

                                  <img onClick={this.showFirstName} className="avatar rounded-circle img-thumbnail editInfo" src="https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png" />
                                  : null
                                }

                              </div>
                            }

                          </td>
                        </tr>

                        <tr>
                          <td id="table-pad" style={bold}>Last Name</td>
                          <td id="table-pad" class="value-bar">

                            {!this.state.hideLastName ?
                              <div>
                                <input name="editPersonalInfo" value={this.state.editPersonalInfo} onChange={this.handleChange} type="text" />
                                <input onClick={this.handleLastName} type="submit" value="Change" />
                                <input onClick={this.cancel} type="submit" value="Cancel" />
                              </div>
                              :

                              <div className="value-align">
                                <span className="value-float">
                                  {this.state.lastName}
                                </span>

                                {this.state.realUser ?

                                  <img onClick={this.showLastName} className="avatar rounded-circle img-thumbnail editInfo" src="https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png" />

                                  : null
                                }
                              </div>
                            }


                          </td>
                        </tr>

                        <tr>
                          <td id="table-pad" style={bold}>Email</td>
                          <td id="table-pad" class="value-bar">

                            {!this.state.hideEmail ?
                              <div>
                                <input name="editPersonalInfo" value={this.state.editPersonalInfo} onChange={this.handleChange} type="text" />
                                <input type="submit" value="Change" />
                                <input onClick={this.cancel} type="submit" value="Cancel" />
                              </div>
                              :

                              <div className="value-align">

                                <span className="value-float">
                                  {this.state.email}
                                </span>


                              </div>
                            }


                          </td>
                        </tr>

                        <tr>
                          <td id="table-pad" style={bold}>Display Name</td>
                          <td id="table-pad" class="value-bar">



                            {!this.state.hideName ?
                              <div>
                                <input name="editPersonalInfo" value={this.state.editPersonalInfo} onChange={this.handleChange} type="text" />
                                <input onClick={this.handleDisplayName} type="submit" value="Change" />
                                <input onClick={this.cancel} type="submit" value="Cancel" />
                              </div>
                              :

                              <div className="value-align">

                                <span className="value-float">
                                  {this.state.name}
                                </span>

                                {this.state.realUser ?

                                  <img onClick={this.showDisplayName} className="avatar rounded-circle img-thumbnail editInfo" src="https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png" />

                                  : null
                                }
                              </div>
                            }



                          </td>
                        </tr>
                      </tbody>
                    </table>




                  </div>

                  <div className="col-md-6">
                    <p id="bio-text" style={textBold}>Biography
                    {this.state.realUser ?
                        <img onClick={this.changeBio} className="avatar rounded-circle img-thumbnail edit-bio" src="https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png" />
                        : null
                      }
                    </p>
                    <p id="bio-textarea">

                      {this.state.bio}

                    </p>
                  </div>








                  <div className="basic-info col-md-5">


                    <p id="add-text" style={textBold}>Additional Information</p>
                    <table class="table table-basic ">
                      <thead>
                      </thead>
                      <tbody>
                        <tr  >
                          <td id="table-pad" style={bold}>Vendor</td>
                          <td id="table-pad" class="value-bar">


                            {this.state.vendor ?

                              <div>
                                <i className="fa fa-check fa-lg"></i>

                                {this.state.realUser ?

                                  <a onClick={this.Vendor} href="#">Remove Vendor?</a>

                                  : null
                                }


                              </div>


                              :
                              <div>
                                <i className="fa fa-close fa-lg"></i>


                                {this.state.realUser ?

                                  <a onClick={this.Vendor} href="#">Become a Vendor?</a>

                                  : null
                                }
                              </div>


                            }



                          </td>
                        </tr>

                        <tr>
                          <td id="table-pad" style={bold}>Cosplayer</td>
                          <td id="table-pad" class="value-bar">

                            {this.state.cosplayer ?

                              <div>
                                <i className="fa fa-check fa-lg"></i>


                                {this.state.realUser ?
                                  <a onClick={this.Cosplayer} href="#">Remove Cosplayer?</a>
                                  : null
                                }

                              </div>


                              :
                              <div>
                                <i className="fa fa-close fa-lg"></i>


                                {this.state.realUser ?

                                  <a href="#" onClick={this.Cosplayer}>Become a Cosplayer?</a>
                                  : null
                                }
                              </div>


                            }



                          </td>
                        </tr>

                        {this.state.realUser && this.state.vendor ?
                          <tr>
                            <td id="table-pad" style={bold}>Vendor Page</td>
                            <td id="table-pad" class="value-bar">

                              <button onClick={this.goVendorPage} type="button" class="btn btn-primary">Go</button>




                            </td>
                          </tr>
                          : null
                        }


                        {this.state.cosplayer ?

                          <tr>
                            <td id="table-pad" style={bold}>Cosplayer Page</td>
                            <td id="table-pad" class="value-bar">

                              <button onClick={this.goCosplayerPage} type="button" class="btn btn-primary">Go</button>

                            </td>
                          </tr>
                          : null
                        }
                      </tbody>
                    </table>




                  </div>



                </div>










              </div>
            </div>





















          </div>










        </div >
      );
    } else {
      return (
        <div>loading

          <input id='fileid' type='file' hidden onChange={this.uploadImage} />

          {this.state.realUser ?

            <img id='buttonid' value='Upload' className="avatar rounded-circle img-thumbnail editpencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} />
            :
            <img id='buttonid' value='Upload' className="avatar rounded-circle img-thumbnail editpencil" src={"https://cdn.dribbble.com/users/3293/screenshots/2591498/screen_shot_2016-03-15_at_12.51.52_pm.png"} hidden />

          }

        </div>
      );
    }
  }
}

export default ProfilePage;
