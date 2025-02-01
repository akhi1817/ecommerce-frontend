import toast from "react-hot-toast";


const AxiosToastError = (error) => {
    if (error?.response?.data?.message) {
      toast.error(error.response.data.message); 
    } else {
      console.error("Unexpected Error:", error);
      toast.error("Something went wrong! Please try again.",{duration:5000});
    }
  };
  
  export default AxiosToastError;
  