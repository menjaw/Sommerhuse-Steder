import fetchHelper, {errorChecker} from "./fetchHelpers"
const URL = require("../../package.json").serverURL;

class UserStore {
  constructor() {
    this._data = "";
    this._errorMessage = "";
  }

  getData = (cb) => {
    this._errorMessage = "";
    this._messageFromServer = "";
    let resFromFirstPromise=null;  //Pass on response the "second" promise so we can read errors from server
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/demouser", options)
      .then((res) => {
        resFromFirstPromise = res;
        return res.json();
      }).then((data) => {
        errorChecker(resFromFirstPromise,data);
        if (cb) {
          cb(null, data.message)
        }
      }).catch(err => {
        console.log(JSON.stringify(err))
        if (cb) {
          cb({ err: fetchHelper.addJustErrorMessage(err) })
        }
      })
  }

  getRandom = (cb) =>{
    this._errorMessage = "";
    this._messageFromServer = "";
    let resFromFirstPromise=null;  //Pass on response the "second" promise so we can read errors from server
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/demouser/random", options)
      .then((res) => {
        resFromFirstPromise = res;
        return res.json();
      }).then((data) => {
        errorChecker(resFromFirstPromise,data);
        if (cb) {
          cb(null, data.message)
        }
      }).catch(err => {
        console.log(JSON.stringify(err))
        if (cb) {
          cb({ err: fetchHelper.addJustErrorMessage(err) })
        }
      })
  }

  getPlaces = (cb) =>{
    this._errorMessage = "";
    this._messageFromServer = "";
    let resFromFirstPromise=null;  //Pass on response the "second" promise so we can read errors from server
    const options = fetchHelper.makeOptions("GET", true);
    fetch(URL + "api/places/getPlaces", options)
      .then((res) => {
        resFromFirstPromise = res;
        return res.json();
      }).then((data) => {
        errorChecker(resFromFirstPromise,data);
        if (cb) {
          cb(null, data.message[0])
        }
      }).catch(err => {
        console.log(JSON.stringify(err))
        if (cb) {
          cb({ err: fetchHelper.addJustErrorMessage(err) })
        }
      })
  }


addPlace = (placeData,cb) => {
  this._errorMessage = "";

  var place = placeData;

  var options ={
    method: "POST",
    body: JSON.stringify(place),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }
  let resFromFirstPromise = null;
  fetch(URL + "api/places/createPlace", options)
  .then( res => {
    resFromFirstPromise = res;
    return resFromFirstPromise.json();
  })
  .then(data => {
    //data.message do something
  })
  .catch(err => {
    if(cb) {
      cb({ errorMessage: fetchHelper.addJustErrorMessage(err) });
    }
  })
  return;
  }

  addImage = (imgData,cb) =>{
    this._errorMessage = "";

    var img = imgData;

    var options ={
      method: "POST",
      body: JSON.stringify(img),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }
    let resFromFirstPromise = null;
    fetch(URL + "api/places/file", options)
    .then( res => {
      resFromFirstPromise = res;
      return resFromFirstPromise.json();
    })
    .then(data => {
      //data.message do something
    })
    .catch(err => {
      if(cb) {
        cb({ errorMessage: fetchHelper.addJustErrorMessage(err) });
      }
    })
    return;
    }

    googleMapAPI = (cb) => {
      return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=55.770048,12.512317&key=AIzaSyCz6CXCdF8M2VYULTv3Nl4lInwlFuCEPQI')
        .then((response) => response.json())
        .then((responseJson) => {
          const finalJSon = responseJson.results[0];
          console.log(finalJSon);
          return finalJSon;
        })
        .catch((error) => {
          console.error(error);
        });
    }

} //class end here


let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
