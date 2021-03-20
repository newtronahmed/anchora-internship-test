import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import banner from '../../images/22815393.jpg'
import Header from '../partials/header'
const BASE_URL = 'https://test.anchoratechs.com'
const SingleItem = ({history}) => {
    const {id} = useParams()
    const [item, setItem] = useState({})
    //load items on mount
    useEffect(()=> {
        axios.get(BASE_URL+'/items/'+id).then(response=>{
        setItem(response.data.data)
        })  
    }, [setItem,id])
    //handle delete
    const handleDelete = () =>{
        axios.delete(BASE_URL+'/items/'+id).then(response=>{
            history.push('/')
        }).catch(err=>{
            console.log(err)
        })
    }
    return (
        <>
            <div className='container'>
                <Header />
                <div className="row justify-content-center align-items-center border border-primary mt-4" style={{height:'500px'}}>
                    <div className="col-md-6 d-flex justify-content-center ">
                        <img className='image   img-rounded  rounded-circle ' src={ banner } alt="item" style={{height:'300px' , width:'350px'}}/>
                    </div>
                    <div className="col-md-6">
                        <h2 className="">{item.title}</h2>
                        <div className="lead mt-2">Description:{item.description}</div>
                        <div className="lead mt-2">Price: Ghc {item.price}</div>
                        <div className="lead mt-2">Category: {item.category?.name}</div>
                        <div className='d-flex mt-2'>
                                <Link className='btn btn-outline-warning mr-2 ' to={`/items/edit/${id}`} >Edit</Link>
                            <button className='btn btn-outline-danger ml-2 ' onClick={()=>handleDelete()}>Delete</button>
                            
                        </div>
                    </div>

                </div>
            </div>
            
        </>
    )
}

export default SingleItem
