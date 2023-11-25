import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { CardProduct } from "../../conponents/ProductItem";
import * as productServices from '../../api/productServices';
function ProductList() {
    let {id } = useParams()
    const [category,setCategory] =useState(null)
    const [listProduct, setListProduct] =useState([])
    useEffect(()=>{
        const getProductByCate =async()=>{
            const resulf =await productServices.productByCid(id)
            if(resulf != null){
                setCategory(resulf.loaisanpham)
                setListProduct(resulf.gr)
            }
        }
        getProductByCate()
    },[id])
    return (
        <>
        <div className="container">
        
            <div className="product-list">
            <p className="fs-4">{category ? category.ten : ''}</p>
                <div className="row row-cols-auto">
                        {listProduct ? listProduct.map((e,index)=>(
                            <CardProduct key={index} data ={e}/>
                        )): <Fragment></Fragment>}
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductList;