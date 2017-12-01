import React, {Component} from "react";
import Data from "../facades/userFacade";

export default class Map extends Component{
  constructor(props){
    super(props);
    this.state = { data: [] }
  }

  componentWillMount() {
    /*
    This will fetch data each time you navigate to this route
    If only required once, add "logic" to determine when data should be "refetched"
    */
    Data.googleMapAPI((data) => {
      this.setState({ data: data });
    });
  }

  render() {
    /*const data = this.state.data.map(function(element){
      return <div>
                {element.formatted_address}
              </div>
      });*/

      return (
        <div>
          {console.log(this.state.data)}
        </div>
      )
  }
}
