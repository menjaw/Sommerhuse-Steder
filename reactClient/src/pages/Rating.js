import React, { Component } from 'react'
import Data from "../facades/userFacade";
import auth from '../authorization/auth';

export default class Rating extends Component {
    constructor(props){
      super(props);
      this.state = {
        err: "",
        rate: '1',
        loggedIn: auth.loggedIn,
      }
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({rate:  e.target.value}, this.handleSubmit);
    }

    handleSubmit = (e) => {
      alert('you choice is ' + this.state.rate);
    }

    render(){
      if(!this.state.loggedIn){
        return <div className="dropdown">
          <select className="btn btn-secondary dropdown-toggle" onChange={this.handleChange} value={this.state.rate} >
            <option className="dropdown-item" value="1">1 Star</option>
            <option className="dropdown-item" value="2">2 Star</option>
            <option className="dropdown-item" value="3">3 Star</option>
            <option className="dropdown-item" value="4">4 Star</option>
            <option className="dropdown-item" value="5">5 Star</option>
            </select>
          </div>
      }else{
        return <div>{console.log(this.state.loggedIn)}</div>
      }
    }
}
