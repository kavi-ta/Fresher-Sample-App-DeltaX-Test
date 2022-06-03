import React from "react"

import { isAuthenticated } from "./helper/authapicalls"
import {Redirect, Route} from "react-router-dom"


// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute=({ component:Component, ...rest })=> {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute