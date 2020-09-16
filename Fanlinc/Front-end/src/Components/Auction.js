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

class Auction extends Component {

  constructor(props) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    super(props);
    this.state = {
      myFandoms: [],
      fandomId: myParam,
      fandomInfo: [],
      auctionInfo: [],
      title: '',
      min_price: null,
      quick_sale: null,
      item_image: '',
      auctionMsg: null,
      vendor: false,
      searchQuery: ''



    };
    if (localStorage.getItem('loggedin') !== 'true') {
      this.props.history.push("/")
    }

    this.refreshId = this.refreshId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }


  refreshId(event) {
    this.props.history.push("/Auction?fandomId=" + event.target.id)
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    this.setState({ fandomId: myParam });
    // this.getFandomInfo();
    // this.getAuctionInfo();
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
          this.props.history.push("/Auction");
          if (this.state.fandomId !== null) {
            window.location.reload();
          }
        }



      })
      .catch(function (error) {
        console.log(error);

      });
  }

  getProfile() {
    const userId = localStorage.getItem('id');
    axios.get(`${API_HOST_URL}/getProfile/` + userId)
      .then((response) => {
        this.setState({ vendor: response.data.vendor });
      })
      .catch(function (error) {
        console.log(error);

      });

  }

  componentDidMount() {
    this.getMyFandoms();
    this.getProfile();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')
    if (myParam !== null) {
      // this.getFandomInfo();
      this.getAuctions();
    }
  }

  componentDidUpdate(newProps) {
    if (this.props.location !== newProps.location) {
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get('fandomId')
      console.log(myParam);
      if (myParam === null) {
        // this.setState({ fandomInfo: [] });
        this.setState({ auctionInfo: [] });
      } else {
        this.getAuctions();
      }

    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);



    var regex = /^\d+(?:\.\d{0,2})$/;
    const userId = localStorage.getItem('id');
    const fandomId = urlParams.get('fandomId');
    const title = this.state.title;
    const min_price = this.state.min_price;
    const quick_sale = this.state.quick_sale;
    const item_image = this.state.item_image
    console.log("userId " + userId);
    console.log("fandomId " + fandomId);
    console.log("Title " + title);
    console.log("min price " + min_price);
    console.log("Quick sale " + quick_sale);
    console.log("item image " + item_image);


    if (fandomId === null) {
      this.setState({ auctionMsg: "You are not in a fandom" });
      return;
    }




    if (min_price === null || quick_sale === null || title === '' || item_image === '') {
      this.setState({ auctionMsg: "Please fill out every field" });
      return;
    }



    if (!regex.test(min_price) || !(regex.test(quick_sale))) {
      this.setState({ auctionMsg: "Dollar format please i.e. 1.00" });
      return;
    }

    console.log(parseFloat(min_price) > parseFloat(quick_sale));
    if (parseFloat(min_price) > parseFloat(quick_sale)) {
      this.setState({ auctionMsg: "Min price should not be bigger than your instant sale price" });
      return;
    }



    axios.put(`${API_HOST_URL}/createAuction`, {
      "userId": userId,
      "fandomId": fandomId,
      "title": title,
      "min_price": min_price,
      "quick_sale": quick_sale,
      "item_image": item_image
    })
      .then((response) => {
        if (response.data.status === 200) {
          this.setState({ auctionMsg: '' });
          //this.clearData();
          //this.getComments();
          this.getAuctions();
          this.setState({ title: ''  });
          this.setState({ min_price: ''  });
          this.setState({ quick_sale: null  });
          this.setState({ item_price: null  });
          this.setState({ item_image : ''});
          

        } else {
          this.setState({ auctionMsg: response.data.msg });
        

        }

      })
      .catch(function (error) {
        console.log(error);

      });
  }

  getAuctions() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')

    axios.get(`${API_HOST_URL}/getAuction/` + myParam)
      .then((response) => {
        this.setState({ auctionInfo: response.data });
        console.log(this.state.auctionInfo);
      })
      .catch(function (error) {
        console.log(error);

      });
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
      });


  }


  viewAuction = (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')

    this.props.history.push("/Auction/item?fandomId=" + myParam + "&auctionId=" + event.target.id);
  }


  viewProfile = (event) => {
    this.props.history.push("/Profile?user=" + event.target.id);

  }


  handleSearch(event) {
    event.preventDefault();
    console.log(this.state.searchQuery);
    if (this.state.searchQuery === '') {
      this.getAuctions();
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('fandomId')

    axios.get(`${API_HOST_URL}/getAuction/` + myParam + "/" + this.state.searchQuery)
      .then((response) => {
        this.setState({ auctionInfo: response.data });

      })
      .catch(function (error) {
        console.log(error);

      });
  }











  render() {

    const vendor = this.state.vendor;

    const MyFandoms = this.state.myFandoms.map(o =>
      <div key={shortid.generate()}>
        <NavItem key={o.name} id="navi">
          <NavLink href="#" onClick={this.refreshId} id={o.value} >{o.name}</NavLink>
        </NavItem>



      </div>
    );

    const auctions = this.state.auctionInfo.map(o =>

      <tr key={shortid.generate()}>
        <td>{o.title}</td>
        <td>${o.min_price}</td>
        <td>${o.quick_sale}</td>
        <td>${o.curr_bid}</td>
        <td id={o.curr_bidder} onClick={this.viewProfile}>{o.curr_name}</td>
        <td id="buttonrow">
          <Button id={o.auctionId} onClick={this.viewAuction}>Bid</Button>
        </td>
      </tr>



    );
    const auctionMsg = this.state.auctionMsg;
    return (
      <div id="auction">
        <NavigationBar />
        <div className="container_rest">
          <div className="containers">
            <div className="all_info text-center">

              <h3>Auction Page</h3>



              <Nav id="navi">
                {MyFandoms}
              </Nav>


              <div className="searchdiv">
                <Form onSubmit={this.handleSearch}>
                  <input type="text" name="searchQuery" onChange={this.handleChange} value={this.state.searchQuery} placeholder="Search" ></input>
                  <button type="submit"><i className="fa fa-search" id="search-pads"></i></button>

                </Form>
              </div>

              <hr />


              <table className="text-center">
                <thead className="text-center">
                  <tr className="text-center">
                    <th className="items"><a>Items</a></th>
                    <th>Min Bid</th>
                    <th>QuickSale</th>
                    <th>Current Bid</th>
                    <th>Current Highest Bidder</th>

                  </tr>


                  {auctions}
                </thead>

              </table>


              {vendor ?

                <Form className="makeauction text-center" onSubmit={this.handleSubmit}>
                  <h1> Make an Auction</h1>
                  <div className="col-25">
                    <label htmlFor="fname">Item:</label>
                  </div>
                  <div>
                    <input type="text" maxLength="150" name="title" placeholder="Item title.." value={this.state.title} onChange={this.handleChange} />
                  </div>
                  <div>
                    <label htmlFor="fname">Minimum Bid:</label>
                  </div>
                  <div>
                    <input type="text" name="min_price" value={this.state.min_price || ''} onChange={this.handleChange} placeholder="minimum bid.." />
                  </div>
                  <div>
                    <label htmlFor="fname">QuickSale</label>
                  </div>
                  <div>
                    <input type="text" name="quick_sale" value={this.state.quick_sale || ''} onChange={this.handleChange} placeholder="instant sale price.." />
                  </div>

                  <div>
                    <label htmlFor="fname">Item Image</label>
                  </div>

                  <input
                    type="file"
                    onChange={this.uploadImage}
                  />


                  <div className="submit">
                    <Button type="submit">Submit</Button>
                  </div>

                  <span style={error}>{auctionMsg}</span>

                </Form>

                : null}






            </div>
          </div>
        </div>






      </div>


    );
  }
}

export default Auction;
