import React, { Component } from 'react';
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router";
import Home from './Components/Home'
import Login from './Components/Login'
import Logout from './Components/Logout'
import SignUp from './Components/SignUp'
import BioChange from './Components/ProfileManager/BioChange'
import createFandom from './Components/addFandom'
import CreatePost from './Components/CreatePost'
import postview from './Components/postview'
import Auction from './Components/Auction'
import item from './Components/item'
import Collections from './Components/collections/collections'
import VendorSales from './Components/vendorSales'
import Error from './Components/Error'
import Profile from './Components/ProfilePage/ProfilePage'




class App extends Component {


  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route exact path="/home" component={Home} />
          <Route path="/Logout" component={Logout} />
          <Route path="/SignUp" component={SignUp} />
          <Route exact path="/Profile" component={Profile} />
          <Route path="/Profile/bio" component={BioChange} />
          <Route exact path="/create" component={createFandom} />
          <Route exact path="/Home/CreatePost" component={CreatePost} />
          <Route exact path="/Home/Post" component={postview} />
          <Route exact path="/Auction" component={Auction} />
          <Route exact path="/Auction/item" component={item} />
          <Route exact path="/Profile/cosplayer" component={Collections} />
          <Route exact path="/Profile/vendor" component={VendorSales} />




          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
