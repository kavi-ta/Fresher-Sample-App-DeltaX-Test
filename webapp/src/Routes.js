import React from 'react'
import {BrowserRouter,Switch, Route} from "react-router-dom"
import AddArtist from './artist/AddArtist'
import PrivateRoute from './auth/PrivateRoute'
import Home from './core/Home'
import AddSong from './song/AddSong'
import Signin from './user/Signin'


const RouteComponent = ()=>{
    return( 
        <BrowserRouter>
        <Switch>
            <Route path="/"  exact component={Home} />
            <Route path="/signin"  exact component={Signin} />
            <PrivateRoute path="/addsong"  exact component={AddSong} />
            <PrivateRoute path="/addartist"  exact component={AddArtist} />
            
        </Switch>
        </BrowserRouter>
              
    )   
}

export default RouteComponent;