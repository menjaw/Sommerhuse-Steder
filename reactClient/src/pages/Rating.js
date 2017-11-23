import React, { Component } from 'react'
import Data from "../facades/userFacade";

export default class Rating extends Component {
    constructor(){
      super();
      this.state = { err: "", rate: null}

    }

    

    onChange = (e) => {
        this.setState({rate: 2});
        console.log("efter :" + this.state.rate);
    }

    render(){
        return <div>
        <select className="rating" onChange={this.onChange} value={this.state.rate}>
        <option value="1">1 Star</option>
        <option value="2">2 Star</option>
        <option value="3">3 Star</option>
        <option value="4">4 Star</option>
        <option value="5">5 Star</option>
        </select>  
            </div>
        
    }

}    