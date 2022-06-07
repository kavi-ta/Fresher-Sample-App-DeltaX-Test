import React, {useState} from "react"
import {Link,  withRouter} from 'react-router-dom'
import { isAuthenticated, signout } from "../auth/helper/authapicalls"

const currentTab = (history,path)=>{

    if(history.location.pathname===path){
        return {color:"white"}

    }
    else{
        return {color:"grey"}
    }
}

const Menu = ({history})=>{
    return (
    <div >
        <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
            <ul className="nav  ">

            {!isAuthenticated() && (<li className='nav-item'>
            <Link 
            style={currentTab(history,"/signin")} 
            className='nav-link ' 
            to="/signin">
            Sign In
            </Link>
            
            </li> )}
            
            {isAuthenticated() && (<li className='nav-item'>
            <span 
            style={currentTab(history,"/signout")} 
            className='nav-link '
            onClick={()=>{
                signout(()=>{
                    history.push("/")
                })
            }} 
            to="/">
            Sign Out
            </span>
            
            </li> )}
            <li className='nav-item'>
            <Link 
            style={currentTab(history,"/")} 
            className='nav-link ' 
            to="/">
            Home
            </Link>
            
            </li>
            <li className='nav-item'>
                <Link 
                style={currentTab(history,"/addsong")}
                className='nav-link ' 
                to="/addsong">
                Add Song
                </Link>
            </li>
            

            <li className='nav-item'>
            <Link 
            style={currentTab(history,"/addartist")}
            className='nav-link ' 
            to="/addartist">
            Add Artist
            </Link>
            </li>

            </ul>
            <form class="d-flex ">
            <div class="input-group mt-2 mb-2">
            <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon2"/>
            <button class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
            </div>
        </form>
                </div>
                </nav>
            </div>
            
            
    )

}

export default withRouter(Menu)