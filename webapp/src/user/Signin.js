import React,{useState,useEffect} from "react"
import Base from "../core/Base"
import {Redirect} from "react-router-dom"
import { authenticate, isAuthenticated, signin } from "../auth/helper/authapicalls"



const Signin = ()=>{

    const [values, setValues] = useState({
        name:"",
        email:"",
        error:"",
        success:false,
        didRedirect:false
        
    })

    const {name,email,error,success,didRedirect} = values
    const {user} = isAuthenticated()

    const handleChange = (Name)=>(event)=>{
        setValues({...values,error:false,[Name]:event.target.value})
        
    }
    const onSubmit = (event)=>{
        event.preventDefault()
        setValues({...values,error:false})
        
        signin({name,email})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                authenticate(data,()=>
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    error:"",
                    didRedirect:true
                }))
            }
        })
        
    }
    
    const signInForm = ()=>{
        return (
            <div >
            <div className="row">
            <div className="col-md-6 col-lg-6 offset-sm-3 text-left">
            
            <form > 
            <div class="mb-3 row">
                <label  class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-12">
                <input type="text" onChange={handleChange("name")} class="form-control" value = {name} placeholder="Enter Name">
                </input>
                </div>

            </div>

            <div class="mb-3 row">
                <label  class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-12">
                <input type="text" onChange={handleChange("email")} class="form-control" value={email} placeholder="Enter Email">
                </input>
                </div>

            </div>
          
            <button
            onClick={onSubmit}
            className="btn btn-outline-success btn-block d-flex justify-content-center ">Sign In
            </button>
            </form>
            </div>
               
            </div>
            </div>
           
        )
    }
    const performRedirect = ()=>{
        if(didRedirect && user){
            return <Redirect to="/"/>
        }
        
    }
    const errorMessage = ()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div 
                    className="alert alert-danger"
                    style={{display:error ? "":"none"}}>
                    {error}
                    </div>
                </div>
            </div>
        )
        
        
    }
    return (
        <Base
        >
        <div>
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
        </div>
        
        </Base>
    )
}


export default Signin