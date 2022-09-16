import React, { useState } from 'react'
import { isAuthenticated } from '../auth/helper/authapicalls';
import Base from '../core/Base';
import { addArtist } from './helper/artistapicalls';

const AddArtist=({history})=> {
    
    const [newArtistValues,setNewArtistValues] = useState({
        artistName:"",
        artistdob:"",
        artistbio:"",
        artisterror:"",
        artistsuccess:false,
        
})
    const {artistName,artistdob,artistbio,artisterror,artistsuccess} = newArtistValues
    
    const {user,token} = isAuthenticated()
    
    const handleChange = (Name) =>(event)=>{
        
        setNewArtistValues({...newArtistValues,[Name]:event.target.value})
    }
    
    const onSubmit = (event)=>{
        
        event.preventDefault()
        addArtist(user.Id,token, {artistName,artistdob,artistbio})
        .then(data=>{
            if(data.error){
                setNewArtistValues({...newArtistValues,artisterror:data.error})
            }
            else{ 
                setNewArtistValues({
                    ...newArtistValues,
                    artistName:"",
                    artistbio:"",
                    artistdob:"",
                    artisterror:false,
                    artistsuccess:true
                })
            }
            setTimeout(()=>(
                history.push('/')
            ),1000)
        })
    }
    const successMessage= ()=>{
        // 
        if(artistsuccess){
            return(
                <div className='alert alert-success mt-3'>
                <h4>Artist added successfully</h4>
                </div>  
            )
        }
    }
    const errorMessage =()=>{
        if (artisterror){
            return (
                <h4 className='alert alert-success mt-3'>
                    Failed to create artist
                </h4>
            )
        }
    }

    const createArtistForm = () => (
        <div className="col-md-6 col-lg-6 offset-sm-3 text-left">
        <form >
            <div class="mb-3 row">
            <label  class="col-lg-4 col-form-label">Name</label>
            <div class="col-sm-12">
            <input 
            onChange={handleChange("artistName")}
            type="text"  class="form-control" 
            value={artistName} name="artistName" 
            placeholder="Enter Name"
            required
            minLength={3}>
            </input>
            </div>
            </div>  
            <div class="mb-3 row">
            <label  class="col-lg-4 col-form-label">Date of Birth</label>
            <div class="col-sm-12">
            <input
                required
                onChange={handleChange("artistdob")}
                type ="date"
                name="artistdob"
                value = {artistdob}
                className="form-control"             
                />
            </div>
            </div>
            <div class="mb-3 row">
            <label  class="col-lg-4 col-form-label">Bio</label>
            <div class="col-sm-12">
            <input 
            onChange={handleChange("artistbio")}
            type="text" 
            name="artistbio"
            value = {artistbio}
            class="form-control" 
            placeholder="Enter Name"
            required
            minLength={3}
            >
            </input>
            </div>
            </div>
            <button type="submit"  onClick={onSubmit} className="btn btn-outline-success m-2">
            Add Artist
            </button>
        </form>
        </div>
      );
  return (
    <Base>
        {successMessage()}
        {errorMessage()}
        {createArtistForm()}
    </Base>
  )
}

export default AddArtist