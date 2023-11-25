
import { Link } from 'react-router-dom';
import './style.scss'
import { useEffect, useState } from 'react';
function CategoryItem(props) {
  const [category,setCategory] =useState({})
  useEffect(()=>{
    setCategory(props.data)
  },[category])
    return ( 
          
            <Link 
              to={'/product/'+ category.id} 
              className="btn btn-outline-light text-dark mx-2 border"
              style={{height:"4rem"}}>
                <img  className='d-inline align-middle' style={{width:"3rem",height:"3rem"}} src={category.img}/>
                <span className='fw-bold align-middle'>{category.ten}</span>
            </Link>
     );
}

export default CategoryItem;