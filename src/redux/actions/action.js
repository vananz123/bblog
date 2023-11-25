import * as loginServices from '~/api/loginServices'
import { ADD_CART_PRODUCT,DELETE_CART_PRODUCT ,UPDATE_CART_PRODUCT} from "./constants";
import { ADD_USER,DEL_USER } from "./constants";
export const addCartProduct = (product) => {
    return {
      type: ADD_CART_PRODUCT,
      payload: product,
    };
  };
  
export const deleteCartProduct = (product) => {
  return {
    type: DELETE_CART_PRODUCT,
    payload: product,
  };
};
export const updateCartProduct = (product) => {
  return {
    type: UPDATE_CART_PRODUCT,
    payload: product,
  };
};


export const addUser =(user)=>{
  return{
    type:ADD_USER,
    payload:user
  }
}
export const delUser =()=>{
  return{
    type:DEL_USER
  }
}
export const delUserAPI =()=>{
  return (dispatch)=>{
    window.localStorage.removeItem("accsessToken")
    dispatch(delUser)
  }
}
export const addUserAPI =(token)=>{
  return async (dispatch)=>{
    const resulf = await loginServices.getUser(token)
    let data = resulf
    dispatch(addUser(data))
  }
}