/**
 * Created by Menja on 05-12-2017.
 */
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react';


export class GoogleMap extends Component {
    render() {
        return (
            <Map google={this.props.google} zoom={2}>

                {/*<Marker onClick={this.onMarkerClick} name={'Current location'}/>*/}

                {/*<InfoWindow onClose={this.onInfoWindowClose}>*/}
                    {/*<div>*/}
                        {/*<h1>{this.state.selectedPlace.name}</h1>*/}
                    {/*</div>*/}
                {/*</InfoWindow>*/}
            </Map>
        );
    }
}


export default GoogleApiWrapper({

    apiKey: ("AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo")

})(GoogleMap)