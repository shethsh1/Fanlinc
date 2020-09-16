import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
        localStorage.clear();
        this.props.history.push("/")
    }

  render() {
    

    return (
        <div>

            <h1>Home</h1>
        </div>
    );
  }
}

export default Logout;
