import React from 'react'
import Category from '../../components/Category/Category'
import BannerProduct from '../../components/BannerProduct/BannerProduct'
import HorizontalCard from '../../components/HorizontalCardProduct/HorizontalCard'

const Home = () => {

 


  return (
    <>
    <Category/>
    <BannerProduct/>
    <HorizontalCard  category={"bed"} heading={"Top Beds"} />
    </>
  )
}

export default Home
