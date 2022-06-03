import React,{useState,useEffect} from 'react'
import { addArtist, getArtists } from '../artist/helper/artistapicalls';
import {Link} from "react-router-dom"
import Base from '../core/Base';
import { addArtistToSong, addSong } from './helper/songapicalls';
import { isAuthenticated } from '../auth/helper/authapicalls';
import { useHistory } from 'react-router-dom';

const AddSong=({history})=> {
    const [values, setValues] = useState({
        name:"",
        coverImage:"",
        releaseDate :"",
        artists:[],
        artistIds:[],
        path:"",
        error:"",
        success:false,
        formData:""
    })
    
    
    const [newArtistValues,setNewArtistValues] = useState({
        artistName:"",
        artistdob:"",
        artistbio:"",
        artisterror:"",
        artistsuccess:false,
        
})
    const {artistName,artistdob,artistbio,artisterror,artistsuccess} = newArtistValues
    
    const {name,artistIds,coverImage,releaseDate,path,error,success,artists,formData} = values
    const {user,token} = isAuthenticated()
  
    const handleChange = (Name)=>(event)=>{
       
        if (Name=== "artistIds"){
            let addArtists = artistIds
            if(event.target.checked){
                addArtists.push(event.target.value)
                setValues({...values,artistIds: addArtists})   
            }
            else{ 
                var index = artistIds.indexOf(event.target.value)
                addArtists.splice(index,1)
                setValues({...values,artistIds: addArtists}) 
            }
            
        }
        else{
            const value = Name==="coverImage"? event.target.files[0]: event.target.value
            formData.set(Name,value)
            setValues({...values,[Name]:value,formData:new FormData()})
            console.log(formData)
            // setValues({...values,[Name]:event.target.value,formData:new FormData()})}
    }
    }
    const preload = ()=>{
        getArtists()
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                
                setValues({...values, artists:data, formData: new FormData()})
            }
            
        })

    }

    useEffect(() => {
      preload()
    }, [])


    const addArtistOnClick=(event)=>{
        event.preventDefault()
        console.log(artistdob);
        console.log(artistName);
        console.log(artistbio);
        addArtist(user.Id,token,{artistName,artistdob,artistbio})
        .then(data=>{
            if(data.error){
                setNewArtistValues({...newArtistValues,artisterror:data.error})
            }
            else{
                console.log(data)
                setNewArtistValues({
                    ...newArtistValues,
                    artistName:"",
                    artistbio:"",
                    artistdob:"",
                    artisterror:"",
                    artistsuccess:true

                })
            }
           
        })
    }
    const successMessage= ()=>{
        // 
        console.log(artistsuccess)
        if(artistsuccess){
            preload()
            setTimeout(()=>(
                
                setNewArtistValues({...newArtistValues,artistsuccess:false})
            ),1000)
            
            
            return(
                <div className='alert alert-success mt-3'>
                
                <h4>Artist added successfully</h4>
               
    
                </div>
                 
            )
        }
        if(success){
            
            return(
                <div className='alert alert-success mt-3'>
                
                <h4>Song added successfully</h4>
               
    
                </div>
                 
            )
        }
        

    }
    const errorMessage =()=>{
        if (error){
            return (
                <h4 className='alert alert-success mt-3'>
                    Failed to add song
                </h4>
            )
        }
    }

    const addArtistToTheSongFunction =(songId)=>{
       

        console.log(user.Id,token,songId,artistIds)
        addArtistToSong(user.Id, token, songId, {artistIds})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                console.log(data)
                setValues({
                    ...values,
                    name:"",
                    coverImage:"",
                    releaseDate :"",
                    artists:[],
                    artistIds:[],
                    path:"",
                    error:false,
                    success:true,  
                })
            }
            
            setTimeout(()=>(
                
                history.push("/")
            ),1000)
        })
    }
   
    const onSubmit = (event)=>{
        event.preventDefault()
        setValues({...values,error:""})
        console.log({name,coverImage,releaseDate,path})
        addSong(user.Id,token,{name,coverImage,releaseDate,path})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                addArtistToTheSongFunction(data.insertId)
            }      
        })
    }
    
   const handleNewArtistChange = (Name)=>(event)=>{
        setNewArtistValues({...newArtistValues,[Name]:event.target.value})
   }
    const createSongForm = () => (
        <div className="col-md-6 col-lg-6 offset-sm-3 text-left">
        <form >
            <div class="mb-3 row">
            <label  class="col-lg-4 col-form-label" required>Name</label>
            <div class="col-sm-12">
            <input type="text" onChange={handleChange("name")} class="form-control" placeholder="Enter Name">
            </input>
            </div>
            </div>
            <div class="mb-3 row">
            <label  class="col-lg-4 col-form-label">Add a Cover Photo</label>
            <div class="col-sm-12">
            <input type="file" 
            onChange={handleChange("coverImage")} 
            class="form-control"
            accept='image'
            name="coverImage"
            placeholder="Enter Link to cover image">
            </input>
            </div>
            </div>
        
            <div class="mb-3 row">
            <label  class="col-lg-4 col-form-label">Release Date</label>
            <div class="col-sm-12">
            <input
            required
            onChange={handleChange("releaseDate")}
                type ="date"
                name="releaseDate"
                className="form-control"             
                />
            </div>
            </div>

            <div class="mb-3 row ">
            <label  class="col-lg-4 col-form-label">Add an artists</label>
            
            <div class="col-sm-12 dropdown">
            <button type="button" className="btn btn-outline-light dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            id="dropdownMenuButton1"
            >

            Select Artists From here
            </button>
            <button className="btn btn-outline-light m-2" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#abc">
            Add New Artist </button>

            <div class="modal fade" id="abc" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-black"  id="exampleModalLabel">Add New Artist</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    <div class="modal-body" >
                    <form >
                        <div class="mb-3 row">
                        <label  class="col-lg-4 col-form-label text-black">Name</label>
                        <div class="col-sm-12">
                        <input 
                    onChange={handleNewArtistChange("artistName")}
                        type="text" value={artistName} name="artistName" class="form-control" placeholder="Enter Name" defaultValue={artistName}>
                        </input>
                        </div>
                        </div>
                    
                    
                        <div class="mb-3 row">
                        <label  class="col-lg-4 col-form-label text-black">Date of Birth</label>
                        <div class="col-sm-12">
                        <input
                            onChange={handleNewArtistChange("artistdob")}
                            type ="date"
                            name="artistdob"
                            className="form-control"  
                            value={artistdob}/>
                        </div>
                        </div>
                        <div class="mb-3 row">
                        <label  class="col-lg-4 col-form-label text-black">Bio</label>
                        <div class="col-sm-12">
                        <input 
                        onChange={handleNewArtistChange("artistbio")}
                        type="text"  
                        name="artistbio"
                        value={artistbio}
                        class="form-control" placeholder="Enter Bio">
                        </input>
                        </div>
                        </div>
                    
                        <button type="submit" data-bs-dismiss="modal" aria-label="Close" onClick= {addArtistOnClick} className="btn btn-outline-success m-2">
                            Add Artist
                        </button>
                    </form>

                    
                    </div>
            </div>
            </div>
            </div>

            <form className="dropdown-menu p-4 " 
            aria-labelledby='dropdownMenuButton1'
            >
                
                <ul>
                {artists && artists.map((artist,index)=>(
                    <li    className ="list-group-item" name="artistIds" key = {index} value={artist.ArtistId}>
                    <input onChange={handleChange("artistIds")} value={artist.ArtistId} className='form-check-input me-1' type="checkbox"/>{artist.Name}</li>
                ))}
                
                </ul>
            </form>
               
               
            </div>
            </div>

            <div class="mb-3 row">
            <label  class="col-lg-4 col-form-label">Audio File</label>
            <div class="col-sm-12">
            <input type="file" onChange={handleChange("path")} class="form-control" placeholder="Enter Link to audio file">
            </input>
            </div>
            </div>
          
            <button type="submit" onClick={onSubmit} className="btn btn-outline-success m-2">
                Add Song
            </button>
        </form>
        </div>
      );

  return (
    <Base
    title="Add a New Song">
    {errorMessage()}
    {successMessage()}
    {createSongForm()}

    </Base>
  )
}

export default AddSong