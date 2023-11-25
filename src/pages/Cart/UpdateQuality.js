import { Fragment, useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBasketShopping,
    faMinus,
    faPlus
} from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { updateCartProduct,deleteCartProduct} from "../../redux/actions/action";
function UpdateQuality(props) {
    const product =props.product
    const handlePlus=(product)=>{
        product.soLuong = product.soLuong +1
        props.updateCartProduct(product)
    }
    const handleMinus=(product)=>{
        product.soLuong = product.soLuong -1
        props.updateCartProduct(product)
        if(product.soLuong ==0){
            props.deleteCartProduct(product)
        }
    }
    return (
        <div className="input-group mb-1" style={{width: "170px"}}>
            <button onClick={()=>{handleMinus(product)}} className="btn btn-white border border-secondary px-3" type="button" id="button-addon1" data-mdb-ripple-color="dark">
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <input 
                type="text" 
                className="form-control text-center border border-secondary" 
                value={product.soLuong} aria-label="Example text with button addon" 
                aria-describedby="button-addon1" />
            <button onClick={()=>{handlePlus(product)}} className="btn btn-white border border-secondary px-3" type="button" id="button-addon2" data-mdb-ripple-color="dark">
            <FontAwesomeIcon icon={faPlus} />
            </button>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
      cart: state.cart.cartAr,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateCartProduct:(product_current) => dispatch(updateCartProduct(product_current)),
        deleteCartProduct:(product_current) => dispatch(deleteCartProduct(product_current)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps) (UpdateQuality);