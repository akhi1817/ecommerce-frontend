import React from 'react'
import Category from '../../components/Category/Category'
import BannerProduct from '../../components/BannerProduct/BannerProduct'
import HorizontalCard from '../../components/HorizontalCardProduct/HorizontalCard'
import VerticalCardProduct from '../../components/VerticalCardProduct/VerticalCardProduct'

const Home = () => {

 


  return (
    <>
    <Category/>
    <BannerProduct/>
    <HorizontalCard  category={`bed`} heading={`Top Beds`} />
    <HorizontalCard  category={`chair`} heading={`Top Chairs`} />
    <VerticalCardProduct  category={`dining table`} heading={`Dining Tables`} />
    <VerticalCardProduct  category={`sofa`} heading={`Sofa`} />
    <VerticalCardProduct  category={`table`} heading={`Tables`} />
    <VerticalCardProduct  category={`lighting`} heading={`Lighting Products`} />
    </>
  )
}

export default Home
