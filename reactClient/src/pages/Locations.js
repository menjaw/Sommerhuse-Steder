import React, { Component } from 'react'
import Data from "../facades/adminFacade";
import Rating from "./Rating";
import { Link } from "react-router-dom";

class Locations extends Component {
  constructor(props){
    super(props);
    this.state = { data: [], err: "" }
  }


  componentWillMount() {
    /*
    This will fetch data each time you navigate to this route
    If only required once, add "logic" to determine when data should be "refetched"
    */
    Data.getPlaces((e, data) => {
      if (e) {
        return this.setState({ err: e.err })
      }
      this.setState({ err: "", data });
    });
  }


  render() {

  const data = this.state.data.map(function(element){
    return <div className="place" key={element.id}>
                  <Link to="/details">
                  <ul className="place">
                    <img src={element.img} alt="" />
                    {console.log(element.img)}
                    <li>Street: {element.street}</li>
                    <li>Zip: {element.zip}</li>
                    <li>Rating: {element.rating}</li>
                    <Rating />
                </ul>
                </Link>
            </div>
    }
  );

    return (
      <div>
          <h2>Lokationer</h2>
        <div>
          {data}
        </div>
        { this.state.err && (
          <div className="alert alert-danger errmsg-left" role="alert">
            {this.state.err}
          </div>
        )}
      </div>
    )
  }
}

export default Locations;
