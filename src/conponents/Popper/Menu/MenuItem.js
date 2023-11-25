import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import CategoryItem from '../../CategoryItem';
import './style.scss'
function MenuItem(props) {
    const [catetoryItem, setCatetoryItem] =useState([])
    useEffect(()=>{
        async function getCategory(){
        await axios.get(`/api/LoaiSanPham`)
        .then(res => {
            setCatetoryItem(res.data);
        })
        .catch(error => console.log(error));
        }
        getCategory();
        
    },[])
    return <Tippy 
            interactive
            placement='bottom-start'
            visible ={props.isClick}
            render={(attrs)=>(
            <div className='menu-item' tabIndex={-1} {...attrs}>
                <div className="row">
                    <div className="col-sm-4">
                    {catetoryItem.map((e)=>(
                        <CategoryItem key={e.id} data={e}/>
                    ))}  
                    </div>
                    <div className="col-sm-8">.col-sm-8</div>
                </div>
            </div>
            )}
        >
            {props.children}
        </Tippy>;
}

export default MenuItem;