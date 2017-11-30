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
    fetch(URL + "api/demoall/getPlaces", options)
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
  fetch(URL + "api/demoall/createPlace", options)
  .then( res => {
    resFromFirstPromise = res;
    //return res.json();
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
    fetch(URL + "api/demoall/file", options)
    .then( res => {
      resFromFirstPromise = res;
      //return res.json();
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
      this._errorMessage = "";
      this._messageFromServer = "";
      let resFromFirstPromise=null;  //Pass on response the "second" promise so we can read errors from server
      const options = fetchHelper.makeOptions("GET", true);
      fetch("https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC5oyuVSn6pYba31z5qxD9O7wsnVFGiO9U", options)
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

} //class end here


let userStore = new UserStore();

//Only for debugging
//window.userStore = userStore;
export default userStore;
