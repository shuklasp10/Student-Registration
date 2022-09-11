import React, {useEffect, useState} from 'react'
import FileBase from 'react-file-base64';
import * as api from './api';

function Form ({selectedId, setSelectedId}) {
    const [details,setDetails] = useState({name:"",fname:"",dob:"",gender:"",course:"",mobile:"",email:"",address:"",photo:""});
    const [error,setError] = useState(false);
    
    useEffect(()=>{
        const search = async ()=>{
        if(selectedId){
            try{
                const data = await api.searchData(selectedId);
                setDetails(data[0]);
            }
            catch(e){
                setError(true);
            }
        }
    }
    search();
    },[selectedId])

    const handleClear = (e) => {
        e.preventDefault();
        setSelectedId(null);
        setError(false)
        setDetails({name:"",fname:"",dob:"",gender:"",course:"",mobile:"",email:"",address:"",photo:""})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(selectedId){
                await api.updateData(selectedId,details);
            }
            else{
                await api.postData(details);
            }
            handleClear(e);
            setSelectedId(null);
        }
        catch(e){
            setError(true);
        }
    }
    return (
    
        <form onSubmit={handleSubmit} >
            {error && (<span>Something went wrong</span>)}<br/>
            <label htmlFor="name">Student's Name</label>
            <input required name="name" value={details.name} onChange={(e)=>setDetails({...details,name:e.target.value})}/><br />
            <label htmlFor="fname">Father's Name</label>
            <input required name="fname" value={details.fname} onChange={(e)=>setDetails({...details,fname:e.target.value})} /><br />
            <label htmlFor="dob">Date of Birth</label>
            <input required type="date" name="dob" value={details.dob} onChange={(e)=>setDetails({...details,dob:e.target.value})} /><br />
            <label htmlFor="gender">Gender:</label>
            <div className='Radio'>
            Male<input required type="radio" onChange={(e)=>setDetails({...details,gender:e.target.value})} name="gender" checked={details.gender==='Male'} value="Male" /><br/>
            Female<input required type="radio" onChange={(e)=>setDetails({...details,gender:e.target.value})} name="gender" checked={details.gender==='Female'} value="Female" />
            </div><br/><br/>
            <label htmlFor="course">Course Applied</label>
            <select value ={details.course} required onChange={(e)=>setDetails({...details,course:e.target.value})} name="course">
            
                <option value=""></option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
            </select><br />
            <label htmlFor="mobile">Mobile Number</label>
            <input required name="mobile" value={details.mobile} onChange={(e)=>setDetails({...details,mobile:e.target.value})} /><br />
            <label required htmlFor="email">Email</label>
            <input type="email" value={details.email} onChange={(e)=>setDetails({...details,email:e.target.value})} name="email" /><br />
            <label htmlFor="address">Address</label>
            <input type="textarea" value={details.address} onChange={(e)=>setDetails({...details,address:e.target.value})} name="address" /><br />
            <label htmlFor="photo">Upload Image</label>
          
            <FileBase name="photo" multiple={false} type="file" onDone={(base64)=>setDetails({...details,photo:base64})}/><br />
            <div className='image'>
                <img src={details?.photo?.base64} />
            </div><br/>
            <button onClick={handleClear}>{selectedId?"Cancel":"Clear"}</button>
            <button type="submit">{selectedId?"Save Changes":"Submit"}</button>
          
        </form>
    )
}

export default Form