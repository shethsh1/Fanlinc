import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS-FOLDER/navigationbar.css'

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = localStorage.getItem('loggedin') === 'true';
    this.user = localStorage.getItem('id');
  }



  render() {
    const id = this.user;
    if (this.loggedIn) {
      return (
        <div id="navigationbarcss">




          <div class="NavBarContainer">
            <div class="sidebar">
              <div className="pads">
                <img class="fanlincLogo" src="/fanlinc-logo.png" />
              </div>
              <ul>

                <li><NavLink to="/Home" exact activeClassName={"current"}><i class="fa fa-home fa-lg"></i>Home</NavLink></li>
                <li><NavLink to={"/Profile?user=" + id} exact activeClassName="current"><i class="fa fa-user fa-lg"></i>My Profile</NavLink></li>
                <li><NavLink to="/create" exact activeClassName="current"><i class="fa fa-plus fa-lg"></i>Add Fandom</NavLink></li>
                <li><NavLink to="/Auction" exact activeClassName="current"><i class="fa fa-dollar fa-lg"></i>Auctions</NavLink></li>
                <li><NavLink to="/Logout"><i class="fa fa-power-off fa-lg"></i>Logout</NavLink></li>

              </ul>
            </div>
          </div>



        </div>
      );
    } else {
      return (
        <div>
          <nav>

            <div >
              Navigation Bar
              <ul>
                <li><NavLink to="/" exact activeClassName="current">Login</NavLink></li>
                <li><NavLink to="/Signup" exact activeClassName="current">Sign Up</NavLink></li>

              </ul>
            </div>
          </nav>

        </div>
      );

    }
  }
}

export default NavigationBar;
