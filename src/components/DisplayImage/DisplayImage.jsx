import React from 'react';
import { IoClose } from "react-icons/io5";

const DisplayImage = ({imgurl,onClose}) => {
  return (
  <>
  <div className='col-md-6 d-flex'>
   
  <div className='d-flex p-0 justify-content-between'>
    <img src={imgurl} width={350} height={350}/>
  </div>
  <button className='btn btn-primary 'onClick={onClose}><IoClose /></button>

  </div>
 
  
  
  </>
  )
}

export default DisplayImage
