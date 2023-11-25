import * as request from '../utils/request'
import jwtDecode from 'jwt-decode'
export const categoryAll  = async()=>{
    try{
        const res =await request.get('/api/LoaiSanPham')
        return res
    }catch(error){
        console.log(error)
    }
}
export const categoryById  = async(id)=>{
    try{
        const res =await request.get(`/api/LoaiSanPham/${encodeURIComponent(id)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const categoryAddNew  = async(data,token)=>{
    try{
        const cate ={
            kc:data.kc,
            doKc:data.doKc,
            loaiKc:data.loaiKc,
            ten: data.ten,
            img:data.img
        }
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const res =await request.post('/api/LoaiSanPham',cate,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const categoryUpdate  = async(data,token)=>{
    try{
        const cate ={
            id:data.id,
            kc:data.kc,
            doKc:data.doKc,
            loaiKc:data.loaiKc,
            ten: data.ten,
            img:data.img
        }
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const res =await request.put('/api/LoaiSanPham',cate,option)
        return res
    }catch(error){
        console.log(error)
    }
}