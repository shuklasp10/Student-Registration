import axios from 'axios';

const URL = "http://localhost:5000/";

export const getData = async () =>{
    try {
        const {data} = await axios.get(URL);
        return data;
    }
    catch(e){
        console.log('something went wrong');
    }
}

export const postData = async (details) =>{
    try{
        const {data} = await axios.post(URL+"register",details);
        return data;
    }
    catch(e){
        console.log('something went wrong');
    }
}

export const deleteData = async (id) =>{
    try{
        const {data} = await axios.delete(URL+id);
        return data;
    }
    catch(e){
        console.log('something went wrong');
    }
}
export const updateData = async (id,details) =>{
    try{
        const {data} = await axios.patch(URL+id,details);
        return data;
    }
    catch(e){
        console.log('something went wrong');
    }
}

export const searchData = async (id) =>{
    try{
        const {data} = await axios.get(URL+'search/'+id);
        return data;
    }
    catch(e){
        console.log('something went wrong');
    }
}