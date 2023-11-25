import { Fragment, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBasketShopping,
    faMinus,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { deleteCartProduct} from "../../redux/actions/action";
import UpdateQuality from './UpdateQuality'
import { Link } from "react-router-dom";
function Cart(props) {
    const [totalPrice, setTotalPrice] =useState(0)
    const [totalPricePromotion, setTotalPricePromotion] =useState(0)
    useEffect(()=>{
        let total =0
        let totalP =0
        props.cart.map((product)=>{
            total = total + product.tongGia
            totalP =totalP + product.giaGiam
        })
        setTotalPricePromotion(totalP)
        setTotalPrice(total)
    })
    return (
        <div className="container-fluid">
            <div className="row">
                
                {props.cart.length > 0 ?    
                <>
                <div className="col-8 border rounded-2 shadow-0">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Sản phẩm</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Tổng</th>
                            <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.cart.map((product)=>(
                                <tr>
                                <th scope="row">
                                    <div className="d-flex mb-3">
                                        <a href="#" className="me-3">
                                            <img src={product.img} style={{maxWidth:"96px", height:"96px"}} className="img-md img-thumbnail" />
                                        </a>
                                        <div className="info">
                                        <a href="#" className="nav-link mb-1">{product.ten}</a>
                                        <pre className="nav-link mb-1" >Cỡ: {product.kichCo}</pre>
                                        <UpdateQuality product={product}/>
                                        </div>
                                    </div>
                                </th>
                                <td><p className="text-dark">{ChangeCurrence(product.giaBanKm !=0 ? product.giaBanKm : product.giaBan)}</p></td>
                                <td><strong className="text-dark"> {ChangeCurrence(product.tongGia)}</strong></td>
                                <td><button type="button" className="btn btn-secondary btn-sm" onClick={()=>{props.deleteCartProduct(product)}}>Xóa</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
                </> : <div className="col-8"><strong className="text-center">Không có sản phẩm trong giỏ hàng</strong></div>   }
                <div className="col-4">
                    <div className="container-fluid border rounded-2 shadow-0">
                        <p className="fs-5">Tóm tắt đơn hàng</p>
                        <div className="d-flex justify-content-between">
                            <p className="">Tổng tiền</p>
                            <strong className="fs-6 fw-light ">{ChangeCurrence(totalPrice)}</strong>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="">Giá giảm</p>
                            <p className="fs-6 text-danger fw-bold float-end">{ChangeCurrence(totalPricePromotion)}</p>
                            
                        </div>
                        <div className="d-flex justify-content-between">
                            <p className="">Tổng cộng</p>
                            <strong className="fs-6 text-danger fw-bold float-end">{ChangeCurrence(totalPrice-totalPricePromotion)}</strong>
                            
                        </div>
                        {totalPrice > 0 ? <Link to={'/pay-checkout'} type="button" class="btn btn-primary btn-lg mt-2 mb-2 w-100">Đặt hàng</Link>:
                        <Link to={'/pay-checkout'} type="button" class="btn btn-primary btn-lg mt-2 mb-2 w-100 disabled" >Đặt hàng</Link>} 
                    </div>            
                </div>
        </div>
    </div>
    );
}
const ChangeCurrence = (number) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
const mapStateToProps = (state) => {
    return {
      cart: state.cart.cartAr,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        deleteCartProduct: (product_current) => dispatch(deleteCartProduct(product_current)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps) (Cart);