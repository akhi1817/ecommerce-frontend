import React from 'react'

const BannerProduct = () => {
  return (
   <>
   <div id="carouselExampleRide" className="carousel slide" data-bs-ride="true">
  <div className="carousel-inner  ">
    <div className="carousel-item active">
      <img src="./assets/banner 1.png" className="d-block mx-auto" style={{width:'90vw',height:'400px'}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="./assets/banner 2.png" className="d-block mx-auto" style={{width:'90vw',height:'400px'}} alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="./assets/banner 3.png" className="d-block mx-auto" style={{width:'90vw',height:'400px'}} alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
   
   </>
  )
}

export default BannerProduct
