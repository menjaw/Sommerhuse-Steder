import React from "react"
import {Route, Switch } from "react-router-dom"
import Login from "./Login";
import Logout from "./Logout";
import Map from "./Map";
import UserPage from "./UserPage";
import RandomNumber from "./RandomNumber";
import AdminPage from "./AdminPage";
import UserList from "./UserList";
import TopMenu from "./TopMenu";
import Register from "./Register";
import Locations from "./Locations";
import Details from "./Details";
import AddPlace from "./AddPlace";


function App() {
  return (
    <div>
      <TopMenu />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/map" component={Map} />
        <Route path="/user" component={UserPage} />
        <Route path="/userlist" component={UserList} />
        <Route path="/locations" component={Locations} />
        <Route path="/details" component={Details} render={ (props) => ({...props})} />
        <Route path="/random" component={RandomNumber} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/addplace" component={AddPlace} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  )
}
export default App;
