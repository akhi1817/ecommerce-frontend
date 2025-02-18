import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../../config/productCategory';
import VerticalCard from '../../components/VerticalCardSearch/VerticalCard';
import axios from 'axios';
import { API_ENDPOINTS } from '../../config/api';

const CategoryProduct = () => {
        const navigate=useNavigate();
        // sort
        const[sortBy,setSortBy]=useState("")

        console.log("sort by ",sortBy)
        // filters
        const [data,setData]=useState([]);
        const [selectCategory,setSelectCategory]=useState({})
        const [filterCategoryList,setFilterCategoryList]=useState([])

        const location=useLocation();
        const urlSearch= new URLSearchParams(location.search)
        const urlCategoryListArray= urlSearch.getAll("category")

        const urlCategoryListObject={}

       urlCategoryListArray.forEach(el =>{
        urlCategoryListObject[el]=true
       })

      

        const fetchData=async()=>{
          const response= await axios.post(API_ENDPOINTS.FILTER_PRODUCT,{
            category:filterCategoryList
          })
          setData(response?.data?.data)
        }

        const handleSelectCategory=async(e)=>{

          const {name,value,checked}=e.target;

          

              setSelectCategory((preve)=>{
                return{
                  ...preve ,
                  [value]:checked
                }
              })
            

        }


        // calling backend api of fetchdata
        useEffect(()=>{
          fetchData()
        },[filterCategoryList])

        useEffect(()=>{
          const arrayOfCategories=Object.keys(selectCategory).map(categoryKeyName=>{
            if(selectCategory[categoryKeyName]){
              return categoryKeyName;
            }
            return null
          }).filter(el =>el)

          setFilterCategoryList(arrayOfCategories)
        //format for url change  
        const urlFormat = arrayOfCategories.map((val, index) => {
          if (index === arrayOfCategories.length - 1) {
            return `category=${val}`;
          }
          return `category=${val}&&`;
        });
        // navigate to the particular route
          navigate(`/category?${urlFormat.join('')}`)
        },[selectCategory])


        // sort by price
        const handleSortBy=(e)=>{
          const {value}=e.target;

          setSortBy(value)

          if(value==="asc"){
            setData(preve =>preve.sort((a,b)=>a.sellingPrice  -  b.sellingPrice))
          }

          if(value==="desc"){
            setData(preve =>preve.sort((a,b)=>b.sellingPrice  -  a.sellingPrice))
          }
        }

        useEffect(()=>{
        },[sortBy])

  return (
    <div className='container-fluid'>
      <div className="row">
        {/* left side */}
        <div className='col-md-2 overflow-y-scroll'style={{height:'450px'}}>
          {/* sort */}
              <h3 className='text-uppercase'>Sort By</h3>
              <form className='d-flex flex-column '>
                <div className='d-flex align-items-center'>
                  <input  type='radio' className='ms-1' name='sortBy' checked={sortBy==="asc"} value={"asc"} onChange={handleSortBy}/>
                  <label className='ms-2'>Price - Low to High</label>
                </div>
                <div>
                  <input type='radio' className='ms-1' name='sortBy' checked={sortBy==="desc"} value={"desc"} onChange={handleSortBy}/>
                  <label className='ms-2'>Price - High to Low</label>
                </div>
              </form>
              {/* filter By */}
              <h3 className='text-uppercase mt-3'>Category</h3>
              <form className='d-flex flex-column justify-content-start '>
                {
                  productCategory.map((categoryName,index)=>{
                    return(
                      <div className='d-flex align-items-center mt-3'>
                        <input type='checkbox' className='ms-1' name={'category'} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                        <label htmlFor={categoryName?.value} className='ms-2'>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>
        </div>
        {/* right side */}
        <div className='col-md-10'>
                  <div>
                        <p className='fw-bold fs-4 my-3'>Search Results:{data.length}</p>
                  </div>
                 <div className='overflow-y-scroll'style={{height:'400px'}}> 
                {
                    data.length !== 0 && (
                      <VerticalCard searchdata={data}/>
                    )
                }
                </div>
        </div>
      </div>
      
    </div>
  )
}

export default CategoryProduct
