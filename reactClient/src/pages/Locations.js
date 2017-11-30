import React, { Component } from 'react'
import Data from "../facades/adminFacade";
import Rating from "./Rating";

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
    return <div className="place">
                  <ul className="place" key={element.id}>
                    <img src={element.imageURL} alt="" />
                    <p><li key={element.id}>Street: {element.street}</li>
                    <li key={element.id}>Zip: {element.zip}</li>
                    <li key={element.id}>Beskrivelse: {element.description}</li>
                    <li key={element.id}>Longtitude: {element.longtitude}</li>
                    <li key={element.id}>Latitude: {element.latitude}</li>
                    <li key={element.id}>Rating: {element.rating}</li></p>
                    <Rating />
                </ul>
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
