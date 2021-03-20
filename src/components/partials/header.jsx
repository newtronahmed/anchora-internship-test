import React from 'react'
import {Link} from 'react-router-dom'

const Header = ({active=''}) => {
    return (
        <>
        <div className='my-4 py-4' />
            <div className=" d-flex justify-content-center">
              <Link to='/' className={`mx-2  py-2 w-25 ${active==='items' && 'active'}  btn btn-outline-primary rounded-0`}>All Items</Link>
              <Link to='/categories' className={`mx-2 px-2 py-2 ${active==='categories' && 'active'} w-25 btn btn-outline-primary rounded-0`}>Manage Categories</Link>
        </div>
        </>
    )
}

export default Header
