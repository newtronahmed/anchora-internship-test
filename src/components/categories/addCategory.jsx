import React,{ useState} from 'react'
import { Modal } from 'react-bootstrap'

import axios from 'axios'
const BASE_URL = 'https://test.anchoratechs.com'
const AddCategory = ({show,hide,setCategories , history}) => {
    const  [name,setName] = useState('')
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.post(BASE_URL+'/categories' , {name}).then(response=>{
            console.log(response) 
            hide()
           setCategories((prev)=>[response.data.data,...prev])
           
        }).catch(err=>console.log(err))
        
    }
    return (
        <Modal show={show} onHide={hide}  >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add Category
                </Modal.Title>
                
            </Modal.Header>
            <form method='POST' action={`${BASE_URL}/categories`} >
                <Modal.Body>
                    <div className='form-group'>
                         <label htmlFor="name">Name</label>
                         <input type="text" name='name' value={name} onChange={(e)=>setName(e.target.value)} className="form-control"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary' onClick={handleSubmit}>submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default AddCategory;





