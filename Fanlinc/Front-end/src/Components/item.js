import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import { Button, Form } from 'reactstrap';
import axios from 'axios';
import '../CSS-FOLDER/auction.css'
import dotenv from 'dotenv';
const API_HOST_URL = process.env.REACT_APP_STACT_WEBSITE;


dotenv.config();

const hcent = {
  textAlign: "center",
  display: "inline-block"
}

const error = {
  color: "red"
}



class item extends Component {

  constructor(props) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam1 = urlParams.get('fandomId')
    const myParam2 = urlParams.get('auctionId')
    super(props);
    this.state = {
      auctionInfo: [],
      currHighest: '',
      min_price: 0,
      bid: null,
      errorMsg: '',
      quick_sale: 0
    };

    if (myParam1 === null || myParam2 === null) {
      this.props.history.push("/Auction");
    }
    this.handleChange = this.handleChange.bind(this);
  }


  getAuctions() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam1 = urlParams.get('fandomId')
    const myParam2 = urlParams.get('auctionId')

    axios.get(`${API_HOST_URL}/getAuction/` + myParam1 + "/" + myParam2)
      .then((response) => {
        this.setState({ auctionInfo: response.data });
        this.setState({ currHighest: response.data[0]['curr_bid'] });
        this.setState({ min_price: response.data[0]['min_price'] });
        this.setState({ quick_sale: response.data[0]['quick_sale'] });
        console.log(this.state.auctionInfo);
      })
      .catch(function (error) {
        console.log(error);

      });
  }


  componentDidMount() {
    this.getAuctions();
  }


  makeBid = (event) => {
    event.preventDefault();

    if (parseFloat(this.state.quick_sale) === parseFloat(this.state.currHighest)) {
      this.setState({ errorMsg: "Already sold" });
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const fandomId = urlParams.get('fandomId')
    const auctionId = urlParams.get('auctionId')
    var regex = /^\d+(?:\.\d{0,2})$/;
    const bid = this.state.bid;
    const userId = localStorage.getItem('id');

    if (!regex.test(bid)) {
      this.setState({ errorMsg: "Dollar format please i.e. 1.00" });
      return;
    }

    if (parseFloat(bid) < parseFloat(this.state.min_price)) {
      this.setState({ errorMsg: "Atleast minimum" });
      return;
    }

    if (parseFloat(this.state.quick_sale) < parseFloat(bid)) {
      this.setState({ errorMsg: "Must be less than or equal to the quick sale" });
      return;
    }

    if (this.state.currHighest !== '') {
      if (parseFloat(bid) <= parseFloat(this.state.currHighest)) {
        this.setState({ errorMsg: "The highest bid is bigger than or equal to yours" });
        return;
      }
    }


    axios.post(`${API_HOST_URL}/makeBid`, {
      "auctionId": auctionId,
      "fandomId": fandomId,
      "userId": userId,
      "bid": bid
    })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({ errorMsg: "" });
          this.getAuctions();
        } else {
          this.setState({ auctionMsg: response.data.msg });

        }

      })
      .catch(function (error) {
        console.log(error);

      });


  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  viewProfile = (event) => {
    this.props.history.push("/Profile?user=" + event.target.id);

  }






  render() {

    const errorMsg = this.state.errorMsg;


    const viewAuction = this.state.auctionInfo.map(o =>
      <div style={hcent}>
        <h4 style={hcent} id={o.userId} onClick={this.viewProfile}> Auction Created by {o.auctioner}</h4> <br />
        <img src={o.item_image} style={hcent} alt="Avatar" width="75%" height="75%" /> <br />

        <h3 style={hcent}>{o.title}</h3>
        <div id="descriptionbox">
          {o.curr_bid ? <p>Current Highest Bid: ${o.curr_bid}</p>
            : null}
          <p>Quick sale: ${o.quick_sale}</p>

          <p>Min Bid: ${o.min_price}</p>
        </div>
        <div id="bidbox">
          <input type="text" name="bid" placeholder="Make a bid?" value={this.state.bid || ''} onChange={this.handleChange} />
          <button className="button" type="button" onClick={this.makeBid}>Make Bid</button>
        </div>



      </div>

    );




    return (
      <div id="auction-items">

        <NavigationBar />

        <div className="container_rest">
          <div className="containers">
            <div className="all_info text-center">


              {viewAuction}
              <br />
              <span style={error}>{errorMsg}</span>

            </div>
          </div>
        </div>



      </div >
    );
  }
}


export default item;