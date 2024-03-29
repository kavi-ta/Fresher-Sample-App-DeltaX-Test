import { API } from "../../backend";

export const signin = (user)=>{
    return fetch(`${API}/signin`,
    {
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const authenticate  = (data,next)=>{
    if(typeof window!="undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const signout = (next)=>{
    if(typeof window!="undefined"){
        localStorage.removeItem("jwt")
        next()
        return fetch("${API}/signout",{
            method:"GET"
        }).then(response=>console.log("Sign out Success"))
        .catch(error=>console.log("Error in signout"))
    }
}


export const isAuthenticated = ()=>{
    if (typeof window == "undefined"){
        return false
    }
    if (localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}