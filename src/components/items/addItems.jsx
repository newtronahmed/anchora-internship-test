import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Header from '../partials/header'

const BASE_URL = 'https://test.anchoratechs.com'
const AddItems = ({history}) => {
    // const [itemsData,setItemData] = useState({})
    const [categories,setCategories] = useState([])
const [file , setFile] = useState(undefined)
    const onSubmit =(data)=>{
    // console.log(rest)

const config = {
    headers: {'Content-Type' :'multipart/form-data'}
}
console.log(file)
const fileFormData = new FormData()
fileFormData.append('file',file)
fileFormData.append('name',file.name)
         axios.post(BASE_URL+'/upload',fileFormData,config).then(response=>{
             console.log(response.data)
            //Link array is empty
             axios.post(BASE_URL+'/items',{...data,image:file.name}).then(response=>{
       //something is wrong
            history.push('/')
        }).catch(err=>{
            console.log(err)
        }).catch(err=>console.log(err))
        })
        
        

    }
    //load Categoeis on mount
    useEffect(() => {
        const getCategories = ()=>{
            axios.get(BASE_URL+'/categories').then(response=>{
                // console.log(response.data)
                setCategories([...response.data.data])
            })
        }
        getCategories()
    }, [])
    const {register, handleSubmit} = useForm()
    return (
      <div className='container'>
        <Header  />
        <div className='col-sm-6 offset-md-3'>
            <h1 className='text-center'> Add Items</h1>
            <form action={`${BASE_URL}/items`}   method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div>
            <div className='form-group'>
              <label htmlFor='title' >Title</label>
              <input type="text" name='title' ref={register} id='title' className='form-control'/>
            </div>
            <div className='form-group'>
              <label htmlFor='price' >price</label>
              <input type="text" name='price' ref={register} id='price' className='form-control'/>
            </div>
            <div className='form-group'>
              <label htmlFor='description' >description</label>
              <input type="text" name='description' ref={register} id='description' className='form-control'/>
            </div>
            <div className='form-group'>
              <label htmlFor='image' >Image</label>
              <input type="file" name='file' id='image' onChange={(e)=>setFile(e.target.files[0])} className='form-control'/>
            </div>
            <div className='form-group'>
              <label htmlFor="category">Category</label>
              <select className='form-control' ref={register} name="category" id="category">
                {
                    categories.map(({name,id})=>(<option value={id}>{name}</option>))
                }
              </select>
            </div>
        </div>
        <div >
          <button className='btn btn-success inline-block mx-2'>submit</button>
          <button className='btn btn-outline-primary inline-block mx-2' onClick={()=>history.push('/')}>Go back</button>
        </div>
        </form>
        </div>
      </div>
    )
}

export default AddItems
