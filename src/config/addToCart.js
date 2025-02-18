import axios from 'axios';
import {API_ENDPOINTS} from './api.js';
import toast from 'react-hot-toast';

    const addToCart=async(e,id)=>{
        e?.stopPropagation();
        e?.preventDefault();

        try{

        
        const response = await axios.post(API_ENDPOINTS.ADD_TO_CART,{ productID: id }, {
            withCredentials: true,    
          });
            if(response.data.success){
                toast.success(response.data.message)
                console.log(response.data)
            }
            else{
                toast.error(response.data.message)
            }
    
        }
        catch(err){
            toast.error(err.response.data.message)
        }
          
    }

    export default addToCart;