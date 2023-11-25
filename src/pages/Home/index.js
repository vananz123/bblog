import React, { Fragment, useState ,useEffect } from "react"
import * as productServices from '../../api/productServices'
import CardProduct from '../../conponents/ProductItem/CardProduct'

const Home =()=> {
    const [product, setProduct] =useState([])
    useEffect(()=>{
        const getProductByCate =async()=>{
            const resulf =await productServices.productAll()
            if(resulf != null){
                setProduct(resulf)
            }
        }
        getProductByCate()
    },[])
    return (
        <div className="container-fluid">
            <div className="">
                <div className="row border" >
                    <div class="col-4" style={{backgroundColor:"indigo"}}>
                        <p className="mt-4 fs-3 text-white">VA để sang hơn !</p>
                        <p className="text-white text-left">
                        Happy Women's Day. Nhân ngày đặc biệt này VA mang đến rất nhiều CTKM hấp dẫn gửi tặng bạn. Hãy đến và trải nghiệm để mua những món đồ trang sức dành cho người phụ nữ bạn yêu thương!!
                        </p>
                    </div>
                    <div className="col-8" style={{height:"22rem"}}>
                        <img className=" w-100 h-100" src={process.env.PUBLIC_URL + 'access/img/bg.png'}/>
                    </div>
                </div>
            </div>
            
            <div className="container">
                <div>
                    <p className="fs-5">Sản phẩm mới</p>
                </div>
                <div className="row row-cols-auto">
                        {product ? product.map((e,index)=>(
                            <CardProduct key={index} data ={e}/>
                        )): <Fragment/>}
                </div>
            </div>
        </div>
    )
}
export default Home