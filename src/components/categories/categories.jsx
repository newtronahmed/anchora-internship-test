import React, { useState, useEffect } from 'react'
import AddCategory from './addCategory'
import EditCategory from './editCategory'
import {Link} from 'react-router-dom'


import axios from 'axios'
import Header from '../partials/header'
const BASE_URL = 'https://test.anchoratechs.com'
const Categories = ({history}) => {
    const [categories,setCategories] = useState([])
    const [categoryId,setCategoryId] = useState(undefined)
    const [openAddModal,setAddModal] = useState(false)
    const [openEditModal,setOpenEditModal] = useState(false)
    const deleteCategory = (id) => {
        console.log('delete')
        axios.delete(BASE_URL + '/categories/' +id).then(results=>{
            let cat = [...categories]
            cat =cat.filter(each=>each.id!==id)
            setCategories(cat)
        
        })
    }

    useEffect(() => {
        const fetchCategories = ()=>{
            axios.get(BASE_URL+'/categories').then(results=>{
                setCategories(results.data.data)
            })
        }
        fetchCategories()
    }, [])
    const handleEdit = (id) =>{
        setCategoryId(id)
        setOpenEditModal(true)
    }
    return (
        <div className='container'>
            <Header active='categories' />
            <div className='w-25 mx-auto mt-4'>
            <button className='btn btn-sm btn-outline-success w-100 p-2 ' onClick={()=>setAddModal(true)}>Add to Categories</button>
           </div>
            <table className='table table-bordered mt-4'>
                <thead className='thead-light'>
                    <tr>
                        <th>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div>#Categories</div>
                               
                            </div>
                        </th>
                        <th>Actions</th>   
                    </tr>
                    
                </thead>
                <tbody>
                    {
                        categories.map(({name,id},i)=>(
                    <tr key={i}>
                        <td>
                            {name}
                        </td>
                        <td>
                            <button className='btn btn-outline-warning mx-1' onClick={()=>handleEdit(id)}>edit</button>
                            <button className='btn btn-outline-danger mx-1' onClick={()=>deleteCategory(id)}>delete</button>
                        </td>
                    </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            <AddCategory show={openAddModal} history={history} hide={()=>setAddModal(false)} setCategories={setCategories} />
            <EditCategory show={openEditModal} hide={()=>setOpenEditModal(false)} categories={categories} id={categoryId} setCategories={setCategories}/>
        </div>
    )
}

export default Categories
