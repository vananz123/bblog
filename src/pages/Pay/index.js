import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState ,useEffect, useRef, useMemo} from "react";
import FormPay from "./FormPay";
import * as loginServices from '../../api/loginServices'
import * as orderServices from '../../api/orderServices'
function Pay(props) {
    const [totalPrice, setTotalPrice] =useState(0)
    const [totalPricePromotion, setTotalPricePromotion] =useState(0)
    const [khachHang, setKhachHang] =useState({})
    const [loaiTT, setLoaiTT] = useState("1")
    const refSdt =useRef()
    const handleChangeLoaiTT = (event)=>{
        const t = event.target.value
        setLoaiTT(t)
    }
    const natigate =useNavigate()
    const handleCheckSdt= async()=>{
        const resuft =await loginServices.checkStd(refSdt.current.value)
        if(resuft.message =='user exist' || resuft.message =='new password'){
            setKhachHang(resuft.data)
            
        }else{
            if(resuft.message =='create new user'){
                const kh ={
                    id:"",
                    ho:"",
                    ten:'',
                    diaChi:'',
                    sdt:resuft.data.sdt,
                    email:''
                }
                setKhachHang(kh)
            }else{
                alert("số không hợp lệ")
            }
        }
        
    }
    useEffect(()=>{
        let total =0
        let totalP =0
        props.cart.map((product)=>{
            total = total + product.tongGia
            totalP =totalP + product.giaGiam
        })
        if(Object.keys(props.currentUser).length !==0){
            setKhachHang(props.currentUser.data)
        }
        setTotalPricePromotion(totalP)
        setTotalPrice(total)
    })
    const ThanhToanKhiNhanHang = async() =>{
        const apiUpdateKH = await loginServices.updateKH(khachHang)
        const resuft = await orderServices.Order(apiUpdateKH.data.id, totalPrice,totalPricePromotion,loaiTT, props.cart)
        if(resuft.message == "TT KHI NHAN HANG"){
            console.log(resuft)
            alert("Thanh toán thành công")
            window.location.href ='/'
        }
        if(resuft.message =="VNPAY"){
            console.log(resuft.data)
            window.location.href = resuft.data
        }
    }
    return ( 
        <div className="container-fluid">
            <div className="row ">
                
                <div className="col-8 border rounded-2 shadow-0">
                    <p className="mb-1">Chọn phương thức thanh toán</p>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChangeLoaiTT} type="radio" name="loaiTT" id="inlineRadio1" value="1" checked={loaiTT ==="1"}/>
                    <label className="form-check-label" htmlFor="inlineRadio1">Thanh toán khi nhận hàng</label>
                    </div>
                    <div className="form-check form-check-inline">
                    <input className="form-check-input" onChange={handleChangeLoaiTT} type="radio" name="LoaiTT" id="inlineRadio2" value="2" checked={loaiTT ==="2"}/>
                    <label className="form-check-label" htmlFor="inlineRadio2">Thanh toán VNPAY</label>
                    </div>
                    <p className="mt-3">Thông tin</p>
                    {Object.keys(props.currentUser).length !==0 ? <FormPay data={props.currentUser.data} handleSetKh={setKhachHang}/>:('')}
                    {Object.keys(khachHang).length === 0 && Object.keys(props.currentUser).length ===0 ? <>
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="floatingInput" 
                            ref={refSdt}
                            placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Số điện thoại</label>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={()=>{handleCheckSdt()}}>Kiểm tra</button>
                    </>:
                    ''
                    }
                    {Object.keys(khachHang).length !=0 &&  Object.keys(props.currentUser).length ===0 ? 
                    <FormPay data={khachHang} handleSetKh={setKhachHang} />: ''}
                    
                </div>
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
                        {totalPrice > 0 ? <button type="button" onClick={()=>{ThanhToanKhiNhanHang()}} className="btn btn-primary btn-lg mt-2 mb-2 w-100">Thanh toán ngay</button> 
                        :
                        <button type="button" onClick={()=>{ThanhToanKhiNhanHang()}} className="btn btn-primary btn-lg mt-2 mb-2 w-100" disabled>Thanh toán ngay</button> 
                        }
                    </div>   
                    <div className="container-fluid border rounded-2 shadow-0">
                        <p className="fs-5">Danh sách đơn hàng</p>
                        {props.cart.map((product)=>(
                            <div className="d-flex mb-3">
                                <a href="#" className="me-3">
                                <img src={product.img} style={{maxWidth:"96px", height:"96px"}} className="img-md img-thumbnail" />
                                </a>
                                <div className="info">
                                <a href="#" className="nav-link mb-1">
                                    {product.ten}
                                </a>
                                <div className="w-100 d-flex justify-content-around">
                                    <div className="mb-1 fw-light" >Cỡ: {product.kichCo}</div>
                                    <div className="mb-1 fw-light" >Số lượng: {product.soLuong}</div>
                                </div>
                                <strong className="text-dark">{product.giaBanKm ==0? product.giaBan :product.giaBanKm} <sup>đ</sup></strong>
                            </div>
                        </div>
                        ))}
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
      currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps) (Pay);