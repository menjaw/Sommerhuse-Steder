import React, {Component} from "react";
import Data from "../facades/userFacade";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

export default class Map extends Component{
  constructor(props){
    super(props);
    this.state = { data: [], err: "" }
  }

  componentWillMount() {
    /*
    This will fetch data each time you navigate to this route
    If only required once, add "logic" to determine when data should be "refetched"
    */
    Data.googleMapAPI((e,data) => {
      if (e) {
        return this.setState({ err: e.err })
      }
      this.setState({ err: "", data });
    });
  }

  render() {
    const data = this.state.data.map(function(element){
      return <div>

              </div>
      });

      return (
        <div>
            <h2>Map</h2>
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
