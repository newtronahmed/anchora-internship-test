import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import { useParams} from 'react-router-dom'
import Header from '../partials/header'


const BASE_URL = 'https://test.anchoratechs.com'
const EditItems = ({history}) => {
    // const [itemsData,setItemData] = useState({})
    const [ item,setItem] = useState({})
    const [categories,setCategories] = useState([])
    const {id} = useParams('id')

    const [file , setFile] = useState(undefined)
    const onSubmit =(data)=>{
        if(file){
            const config = {
                headers: {'Content-Type' :'multipart/form-data'}
            }
            // console.log(file)
            const fileFormData = new FormData()
        fileFormData.append('file',file)
        fileFormData.append('name',file.name)
         axios.put(BASE_URL+'/upload',fileFormData,config).then(response=>{
            //  console.log(response.data)
            //Link array is empty
             axios.put(BASE_URL+'/items'+id,{...data,image:file.name})
             .then(response=>{
            //something is wrong
            console.log(response)
             history.push('/')
            }).catch(err=>{
            console.log(err)
             })
        }).catch(err=>{
            console.log(err)
            })
        }else {
            axios.put(BASE_URL+'/items/'+id ,{...data,image:item.image})
             .then(response=>{
            //something is wrong
            console.log(response)
             history.push('/')
            }).catch(err=>{
            console.log(err)
             })
        }
    // console.log(rest)
           
        
        

    }
 
    useEffect(() => {
        const getCategories = ()=>{
            axios.get(BASE_URL+'/categories').then(response=>{
                // console.log(response.data)
                setCategories([...response.data.data])
            }).catch(err=>{
                console.log(err.message)
            })
        }
        getCategories()
    }, [])
    const {register, handleSubmit,reset} = useForm()
    useEffect(() => {
        const getItemsById = (id) =>{
            axios.get(BASE_URL+'/items/'+ id).then(response=>{
                console.log(response)
                setItem(response.data.data)
                reset(response.data.data)
            }).catch(err=> {
                console.log(err)
            })
        }
        getItemsById(id)
    }, [id,reset])


    return (
        <div className='container'>
            <Header />
        <div className='col-sm-6 offset-md-3'>
            <h1 className='text-center'> Edit Items</h1>
            <form action={`${BASE_URL}/items`} onSubmit={handleSubmit(onSubmit)}>
        <div>
            <div className='form-group'>
              <label htmlFor='title' >Title</label>
              <input type="text" name='title'  ref={register} id='title' className='form-control'/>
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
              <input type="file" name='file'  id='image' onChange={(e)=>setFile(e.target.files[0])} className='form-control'/>
            </div>
            <div className='form-group'>
              <label htmlFor="category">Category</label>
              <select className='form-control' value={item.category?.id} ref={register} name="category" id="category">
                {/* <option value="1">vehicle</option> */}
                {
                    categories.map(({name,id})=>(<option value={id} key={id}>{name}</option>))
                }
              </select>
            </div>
        </div>
        <div>
        <button className='btn btn-outline-success inline-block mx-2'>submit</button>
        <button className='btn btn-outline-primary inline-block mx-2' onClick={()=>history.push('/')}>Go back</button>
        </div>
        </form>
        </div>
    </div>
    )
}

export default EditItems
