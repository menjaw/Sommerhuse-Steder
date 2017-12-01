import React, { Component } from 'react'
import Data from "../facades/userFacade";
import ImageUploader from 'react-images-upload';

export default class AddPlace extends Component {
    constructor(props){
      super(props);
      this.state = { err: "", place: {street:"",zip:"",description:"",longtitude:"",latitude:"" }, pictures: []}
    }

    handleSubmit = (event) =>
    {
        console.log(this.state.place);
        event.preventDefault()
        const street = this.state.place.street;
        const zip = this.state.place.zip;
        const description = this.state.place.description;
        const longtitude = this.state.place.longtitude;
        const latitude = this.state.place.latitude;
        //const place = this.state.place;
        if(street !== "" && zip !== "" && description !== "" && longtitude !== "" && latitude !== "")
        {
          Data.addPlace(this.state.place,(err) =>
          {
              if (err) {
                  return this.setState({err:err.errorMessage});
              }
              this.setState({ err:""});

          });
          Data.addImage(this.state.pictures,(err) =>
          {
              if (err) {
                  return this.setState({err:err.errorMessage});
              }
              this.setState({ err:""});
          });
        }
    }

    onChange = (e) => {
        const propertyName = e.target.id;
        const value = e.target.value;
        console.log(value);
        let place = this.state.place;
        place[propertyName] = value;
        this.setState({place});
    }

    onDrop = (e) => {
      console.log(this.state.pictures);
      this.setState( { pictures: this.state.pictures.concat(e) });
    }

    render(){
        return (
                  <form onSubmit={this.handleSubmit}>
                      Street <input type="text" name="street" placeholder="street" value={this.state.place.street} onChange={this.onChange} id="street" maxlength="30" /><br />
                      Zip <input type="text" name="zip" placeholder="zip" value={this.state.place.zip} onChange={this.onChange} id="zip" maxlength="5" /><br />
                      Description <input type="text" name="description" placeholder="description" value={this.state.place.description} onChange={this.onChange} id="description" /><br />
                      Longtitude <input type="text" name="longtitude" placeholder="longtitude" value={this.state.place.longtitude}  onChange={this.onChange} id="longtitude" /><br />
                      Latitude <input type="text" name="latitude" placeholder="latitude" value={this.state.place.latitude} onChange={this.onChange} id="latitude" /><br />
                      <ImageUploader
                        withIcon={true}
                        buttonText='Choose images'
                        onChange={this.onDrop}
                        imgExtension={['.jpg', '.JPG','.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                      />
                      <button onClick={this.handleSubmit}>Submit</button>
                  </form>
              )

    }

}
