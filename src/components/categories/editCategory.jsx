import React,{ useState} from 'react'
import { Modal } from 'react-bootstrap'

import axios from 'axios'
const BASE_URL = 'https://test.anchoratechs.com'
 const EditCategory =({show,hide,id , categories , setCategories}) => {
    const [name, setName] = useState('')
   
    // useEffect(() => {
        
        const getCategoryById = () =>{
            axios.get(BASE_URL+'/categories/'+id).then(result=>{
                setName(result.data.data.name)
            })
        }
        // getCategoryById()
    // }, [id])
    const handleSubmit = (e) =>{
        e.preventDefault()
        axios.put(BASE_URL+'/categories/'+id , {name}).then(result=>{
            let cats = [...categories]
            let index = cats.findIndex(each=>each.id === id)
            console.log('index'+index)
           
            if(index!==-1){
                let cat = cats[index]
                cat.name = result.data.data.name;
             
            }
            hide()
            setCategories(cats)
            
        })
    }
    // const handleChange = () => 
    return (
        <Modal show={show} onHide={hide} onShow={getCategoryById}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Edit Category
                </Modal.Title>
                
            </Modal.Header>
            <form method='PUT' action={`${BASE_URL}/categories/${id}`} onSubmit={handleSubmit}>
                <Modal.Body>
                    <div className='form-group'>
                         <label htmlFor="name">Name</label>
                         <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className="form-control"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='btn btn-primary'>submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}
export default EditCategory;