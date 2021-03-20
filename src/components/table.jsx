import React,{useEffect, useState} from 'react'
import axios from 'axios'
const BASE_URL = 'https://test.anchoratechs.com'
const Table = () => {
  
  useEffect(() => {

      const fetchItems = async()=>{
        try {
          const results= await axios.get(BASE_URL+'/items')
        console.log(results)
        // setItems(results.data)
        } catch (error) {
          console.log(error)
        }
       
      }
      
    // fetchItems()
    
  }, [])
  // const addItem = () =>{
  //   axios.post(BASE_URL+'/items',{
  //     title:'Iphone',
  //     price:'134',
  //     image:'iphone.jpg',
  //     description:'New iphone ',
  //     category:'1',
  //   })
  // }
  // addItem()
  
  return (
    <div className="card w-50 mx-auto">
      <div className="card-header">Hello</div>
      <div className="card-body">
       <table className='table'>
         <thead>
           <tr>
             <th>#item <button className='btn btn-sm btn-success mx-1' >add</button></th>
             <th>category <button className='btn btn-sm btn-success mx-1'>add</button> </th>
             <th>Action</th>
           </tr>
         </thead>
         <tbody>
           <tr>
             <td>
               car
             </td>
             <td>
              vehicle
             </td>
             <td>
               <button className='btn btn-sm btn-warning mx-1'>edit</button>
               <button className='btn btn-sm btn-danger mx-1'>del</button>
             </td>
           </tr>
         </tbody>
       </table>
      </div>
      
    </div>
  )
}

export default Table
