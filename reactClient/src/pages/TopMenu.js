import React, {Component} from 'react'
import {Link} from "react-router-dom";
import auth from '../authorization/auth'

class TopMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {loggedIn: auth.loggedIn, userName: auth.userName, isUser: false, isAdmin: true}
    }

    loginStatus = (status, userName, isUser, isAdmin) => {
        this.setState({loggedIn: status, userName, isUser, isAdmin});
    }

    componentDidMount() {
        auth.setLoginObserver(this.loginStatus);
    }

    render() {

        const logInStatus = this.state.loggedIn ? "Logged in as: " + this.state.userName : "";
        //console.log("RENDERING - REMOVE ME",JSON.stringify(this.state));
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/" style={{pointerEvents: "none"}}>Sommerhus</a>
                        </div>


            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/map">Map</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/googleMap">Google</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/geolocation">Geolocation</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/locations">Locations</Link>
                </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addplace">Add Location</Link>
              </li>
              {this.state.loggedIn && this.state.isUser && (<li className="nav-item"><Link className="nav-link" to="/user">Page for Users </Link></li>)}
              {this.state.loggedIn && this.state.isAdmin && (<li className="nav-item"><Link className="nav-link" to="/admin">Page for Admins</Link></li>)}
              {this.state.loggedIn && this.state.isAdmin && (<li className="nav-item"><Link className="nav-link" to="/userlist">List of Users</Link></li>)}


                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="navbar-text" style={{color: "steelBlue"}}>{logInStatus}</li>
                                {!this.state.loggedIn && (
                                    <li className="nav-item"><Link className="nav-link" to="/register">Register</Link>
                                    </li>)}
                                <li className="nav-item">
                                    {this.state.loggedIn ?
                                        (
                                            <Link className="nav-link" to="/logout"><span
                                                className="glyphicon glyphicon-log-in"></span> Logout</Link>
                                        ) :
                                        (
                                            <Link className="nav-link" to="/login">
                                                <span className="glyphicon glyphicon-log-out"></span> Login </Link>
                                        )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


export default TopMenu;
