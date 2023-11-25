
import { ADD_CART_PRODUCT,DELETE_CART_PRODUCT, UPDATE_CART_PRODUCT } from "../actions/constants";
const initialState = {
    cartAr: [],
};
const cartReducers =(state=initialState, action)=>{ //action.payload nhận product 
    switch(action.type){
        case ADD_CART_PRODUCT:
            const productInCart = state.cartAr.find(
                (p) => p.sanPhamId === action.payload.sanPhamId && p.kichCo ===action.payload.kichCo
            );
            if (productInCart == null) {
                return {
                    cartAr: [...state.cartAr, action.payload],
                } 
            }else{
                let newCart = state.cartAr
                const objIndex = newCart.findIndex(
                    (obj) => obj.sanPhamId === action.payload.sanPhamId && obj.kichCo === action.payload.kichCo
                );
                newCart[objIndex].soLuong = newCart[objIndex].soLuong + action.payload.soLuong
                newCart[objIndex].tongGia = newCart[objIndex].giaBan * newCart[objIndex].soLuong
                newCart[objIndex].giaGiam = newCart[objIndex].tongGia - (newCart[objIndex].giaBanKm* newCart[objIndex].soLuong)
                return {
                    cartAr: [...newCart],
                }
            }
        case UPDATE_CART_PRODUCT:
            let newCartUpd = state.cartAr
            const objIndex = newCartUpd.findIndex(
                (obj) => obj.sanPhamId == action.payload.sanPhamId && obj.kichCo == action.payload.kichCo
            );
            newCartUpd[objIndex] = action.payload
            newCartUpd[objIndex].tongGia = newCartUpd[objIndex].giaBan * newCartUpd[objIndex].soLuong
            newCartUpd[objIndex].giaGiam = newCartUpd[objIndex].tongGia - (newCartUpd[objIndex].giaBanKm* newCartUpd[objIndex].soLuong)
            return {
                cartAr: [...newCartUpd],
            }
        case DELETE_CART_PRODUCT:
            let newCartDel =state.cartAr
            const objIndexDel =newCartDel.findIndex(
                (obj) => obj.sanPhamId == action.payload.sanPhamId && obj.kichCo == action.payload.kichCo
            )
            newCartDel.splice(objIndexDel,1)
            return{
                cartAr:[...newCartDel],
            }
        default:
            return state
    }
}
export default cartReducers