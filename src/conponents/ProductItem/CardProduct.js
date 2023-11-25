import { useEffect, useState } from 'react';
import * as productServices from '../../api/productServices'
import { Link } from 'react-router-dom';
import { usePromotionPrecent } from '~/hooks';
function CardProduct(props) {
    //bộ dữ liệu cho Card gồm {sanpham,khuyenmai}
    const d =props.data.sanpham
    const [product,setProduct] =useState({})
    const [promotion,setPromotion] = useState({})
    const [img,setImg]= useState("")
    let promotionPrecent =usePromotionPrecent(product.giaBan,product.giaBanKm,promotion.hieuLuc)
    useEffect(()=>{
        const loadImg =()=>{
            const tt =props.data.sanpham
            if(tt.img != null){
                const str =tt.img
                const imgList = str.split("*")
                setImg( imgList[0])
            }
        }
        loadImg()
        if(props.data.khuyenmai != null){
            setPromotion(props.data.khuyenmai)
        }
        setProduct(props.data.sanpham)
    })
    return <div className='col mt-3'>
                    <Link to={`/product/detail/${product.id}`} className="card position-relative" style={{width:"14rem",textDecoration:"none"}}>
                        <div className='text-center'style={{width:"14rem", height:"14rem"}} >
                            <img src={img} className="card-img-top" alt="..."/>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{product.ten}</h5>
                            {Object.keys(promotion)===0 ? <p className="card-text">{ ChangeCurrence(product.giaBan)}</p>:
                            <p className="card-text">
                                <strong className= "card-text text-danger">{ChangeCurrence(product.giaBanKm)} 
                                    <sup> -{promotionPrecent}</sup>
                                </strong>
                            </p>
                            }
                        </div>
                        {product.moi ? <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            New
                            <span class="visually-hidden">unread messages</span>
                        </span>:''}
                        {product.banChay ? <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            Hot
                            <span class="visually-hidden">unread messages</span>
                        </span>:''}
                    </Link>
            </div>
            
}
const ChangeCurrence =(number)=>{
    if(number){
        const formattedNumber = number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
            currencyDisplay :"code"
        });
        return formattedNumber
    }
    return null
}
export default CardProduct;