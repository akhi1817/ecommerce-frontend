import axios from 'axios';


const fetchUserDetails=async()=>{
  try{
    const response=await axios.get("http://localhost:8000/api/v1/user/login-user-details")
    return response;
  }
  catch(err){
    console.log(err);
  }
}

export default fetchUserDetails;