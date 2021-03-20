import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import defaultBanner from '../../images/22815393.jpg'
import Header from '../partials/header'
// import Modal from 'react-bootstrap'
const BASE_URL = 'https://test.anchoratechs.com'

  
  
const Items = () => {
  const [items,setItems] = useState([])
    useEffect(() => {

        const fetchItems = async()=>{
          try {
            const response= await axios.get(BASE_URL+'/items')
          // console.log(results)
          setItems(response.data.data)
          
          } catch (error) {
            console.log(error)
          }
         
        }
        
      fetchItems()
      
    }, [])
    
  
    return (
        <div className='container'>
           <Header active='items' />  
            <div className="row mt-4 p-4">
              {
                items.map(({title,id,image,price})=>(
                  <div className="col-md-4 mb-4" key={id}>
                  <div className="card border-primary">
                    <img className='card-img-top' src={defaultBanner} alt="hello"/>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                      <div className="lead">{title}</div>
                      <div className="lead">{price}</div>
                      </div>
                      <Link to={`/items/${id}`}className='btn btn-outline-primary mt-1 rounded-0'>show More</Link>
                    </div>
                  </div>
                </div>
                ))
              }
                
            </div>
        </div>
    )
}

export default Items
