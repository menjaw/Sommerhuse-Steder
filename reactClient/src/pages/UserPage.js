import React, { Component } from 'react'
import userData from "../facades/userFacade";
import { DateRange } from 'react-date-range';

class UserPage extends Component {

    constructor(){
      super();
      this.state = {data: "", err:""}
    }

    componentWillMount() {
      /*
      This will fetch data each time you navigate to this route
      If only required once, add "logic" to determine when data should be "refetched"
      */
      userData.getData((e,data)=>{
        if(e){
          return this.setState({err:e.err})
        }
        this.setState({err:"",data});
      });
    }

    handleSelect(range){
           console.log(range);
           // An object with two keys,
           // 'startDate' and 'endDate' which are Momentjs objects.
       }



    render() {
      return (
        <div>
        <DateRange
                   onInit={this.handleSelect}
                   onChange={this.handleSelect}
               />

        </div>
      )
    }

  }

export default UserPage;
