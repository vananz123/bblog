import * as request from '../utils/request'
import jwtDecode from 'jwt-decode'
export const Order = async(khId , tongTien,tongTienGiam, loaiTT , Cart)=>{
    try{
        const CTDonHangMV = []
        Cart.map((e)=>{
            const t ={
                giaBan:e.giaBanKm || e.giaBan,
                tongGia:e.tongGia,
                giaGiam:e.giaGiam,
                soLuong: e.soLuong,
                kichCo : e.kichCo,
                loaiKc:e.loaiKc,
                sanPhamId : e.sanPhamId
            }
            CTDonHangMV.push(t)
        })
        const res = await request.post(`/api/DonHang/dat-hang?khId=${encodeURIComponent(khId)}&tongTien=${encodeURIComponent(tongTien)}&tongTienGiam=${encodeURIComponent(tongTienGiam)}&loaiTT=${encodeURIComponent(loaiTT)}`,CTDonHangMV)
        return res
    }catch(error){
        console.log(error)
    }
}
export const OrderPaymentStatus= async(OrderId)=>{
    try{
        const res = await request.put(`/api/DonHang/order-status?id=${encodeURIComponent(OrderId)}`)
    }catch(error){
        console.log(error)
    }
}
export const OrderAll =async()=>{
    try{
        const res = await request.get('/api/DonHang')
        return res
    }catch(error){
        console.log(error)
    }
}
export const OrderAllByStatus =async(status)=>{
    try{
        const res = await request.get(`/api/DonHang/status?status=${encodeURIComponent(status)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const OrderAllByComfrim =async(id)=>{
    try{
        const res = await request.put(`/api/DonHang/status?id=${encodeURIComponent(id)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const OrderAllByIdKh =async(token)=>{
    try{
        const decodedToken = jwtDecode(token);
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        console.log(decodedToken.id)
        const res = await request.get(`/api/DonHang/khach-hang?id=${encodeURIComponent(decodedToken.id)}`,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const OrderDetail =async(id)=>{
    try{
        const res = await request.get(`/api/DonHang/chi-tiet-hoa-don?id=${encodeURIComponent(id)}`)
        return res
    }catch(error){
        console.log(error)
    }
}