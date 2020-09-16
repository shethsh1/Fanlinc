import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import { Nav, NavItem, NavLink, Button, Form } from 'reactstrap';
import axios from 'axios';
import { NavLink as RRNavLink } from 'react-router-dom';
import shortid from 'shortid';
import dotenv from 'dotenv';
import '../CSS-FOLDER/SearchBar.css'
import '../CSS-FOLDER/auction.css'
dotenv.config();
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE

const error = {
  color: "red"
}

class vendorSales extends Component {

  constructor(props) {

    super(props);
    this.state = {
      myFandoms: [],
      auctionInfo: []



    };
    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/")
    }

    this.deleteAuction = this.deleteAuction.bind(this);


  }


  getAuctions() {


    axios.get(`${API_HOST_URL}/getMyAuctions/` + localStorage.getItem('id'))
      .then((response) => {
        this.setState({ auctionInfo: response.data });
        console.log(this.state.auctionInfo);
      })
      .catch(function (error) {
        console.log(error);

      });
  }

  componentDidMount() {
    this.getAuctions();
  }


  viewProfile = (event) => {
    this.props.history.push("/Profile?user=" + event.target.id);

  }

  deleteAuction(event) {
    axios.post(`${API_HOST_URL}/deleteAuction`, {
      "auctionId": event.target.id
    })
      .then((response) => {
        if (response.data === "deleted") {
          this.getAuctions();
        }
      })


  }









  render() {





    const auctions = this.state.auctionInfo.map(o =>

      <tr key={shortid.generate()}>
        <td>{o.title}</td>
        <td>${o.min_price}</td>
        <td>${o.quick_sale}</td>
        <td>${o.curr_bid}</td>
        <td id={o.curr_bidder} onClick={this.viewProfile}>{o.curr_name}</td>
        <td id="buttonrow">
          <Button id={o.auctionId} onClick={this.deleteAuction}>Delete</Button>
        </td>
      </tr>



    );

    return (
      <div id="auction">
        <NavigationBar />
        <div className="container_rest">
          <div className="containers">
            <div className="all_info">

              <h3 className="text-center">Auction Page</h3>







              <table>
                <thead>
                  <tr>
                    <th className="items"><a>Items</a></th>
                    <th>Min Bid</th>
                    <th>QuickSale</th>
                    <th>Current Bid</th>
                    <th>Current Highest Bidder</th>

                  </tr>


                  {auctions}
                </thead>

              </table>




            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default vendorSales;
