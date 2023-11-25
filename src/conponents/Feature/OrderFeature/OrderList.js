import { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faPhone,faHeadset,
  faAddressCard,
  faCartShopping,
  faUser,
  faBars,
  faX,
  faCheck,
  faCircleXmark,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import * as orderServices from '~/api/orderServices'
function OrderList(props) {
    const [order, setOrder] = useState([])
    const loadOrderStatus =async()=>{
        const resulf =await orderServices.OrderAllByStatus(false)
        if(resulf != null) {
            setOrder(resulf)
        }
    }
    const loadOrder =async()=>{
        const resulf =await orderServices.OrderAllByStatus(true)
        if(resulf != null) {
            setOrder(resulf)
        }
    }
    useEffect(()=>{
        
        if(props.slug == 'order-confrim'){
            loadOrderStatus()
        }else{
            loadOrder()
        }
        
    },[])
    const handleOrderConfrim =async(id)=>{
        const resulf = await orderServices.OrderAllByComfrim(id)
        if(resulf != null){
            alert("thành công")
            loadOrderStatus()
            return
        }else{
            alert("không thành công")
            return
        }
    }
    return ( 
        <div>
            <div class="accordion" id="accordionExample">
                <table class="table table-bordered">
                    <thead className="table-dark" >
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col" style={{width:"300px"}}>Ngày đặt</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Thanh toán</th>
                            <th scope="col">Loại TT</th>
                            <th scope="col">Tổng cộng</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    
                        {order.map((e,index)=>(
                            <>
                            <tr>
                                <td>{index+1}</td>
                                <td>{e.donhang.ngayDat}</td>
                                <td>{e.donhang.ten}</td>
                                <td>{e.donhang.thanhToan ==true ? "Đã thanh toán": "Chưa thanh toán"}</td>
                                <td>{e.donhang.loaiThanhToan == 1 ? "Thanh toán khi nhận hàng" : "Thanh toán momo"}</td>
                                <td>{e.donhang.tongTien -e.donhang.tongTienGiam}</td>
                                <td>{e.donhang.status ? "Đã xác nhận": "Chưa xác nhận"}</td>
                                
                                <td>
                                    {props.slug ? <>
                                        <button type="button" class="btn btn-danger btn-sm mx-1"><FontAwesomeIcon icon={faCircleXmark} /></button>
                                    <button type="button" onClick={()=>{handleOrderConfrim(e.donhang.id)}} class="btn btn-success btn-sm mx-1"><FontAwesomeIcon icon={faCheck} /></button>
                                    </>:<></>}
                                    <button class="btn btn-primary btn-sm" data-bs-toggle="collapse" data-bs-target={`#e${index}`} aria-expanded="true" aria-controls="collapseOne"><FontAwesomeIcon icon={faArrowDown} /></button>
                                    
                                </td>
                            </tr>
                            <tr id={`e${index}`} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              
                                <td colSpan={2}>
                                <div style={{width:"300px"}}>
                                        <p className='fs-5'>Thông tin khách hàng</p>
                                        <p>Tên: {e.donhang.ten}</p>
                                        <p>Số điện thoại: {e.donhang.sdt}</p>
                                        <p>Địa chỉ: {e.donhang.diaChi}</p>
                                    </div>
                                </td>
                                <td colSpan={6}>
                                    
                                        <div class="accordion-body">
                                            <table class="table">
                                                <thead>
                                                    <tr>    
                                                    <th scope="col">#</th>
                                                    <th scope="col">Tên</th>
                                                    <th scope="col">Giá</th>
                                                    <th scope="col">Số lượng</th>
                                                    <th scope="col">Kích cỡ</th>
                                                    <th scope="col">Tổng giá</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {e.gr.map((od,index)=>(
                                                    <tr>
                                                        <th scope="row">{index+1}</th>
                                                        <td>{od.sanpham.ten}</td>
                                                        <td>{od.chitiethoadon.giaBan}</td>
                                                        <td>{od.chitiethoadon.soLuong}</td>
                                                        <td>{od.chitiethoadon.kichCo}</td>
                                                        <td>{od.chitiethoadon.tongGia -od.chitiethoadon.giaGiam}</td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            
                                        </div>
                                    
                                </td>
                            </tr>
                            </>
                        ))}
                    
                    </tbody>
                </table>
            </div>
            
        </div>
     );
}

export default OrderList;