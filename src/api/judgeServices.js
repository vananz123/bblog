import * as request from '../utils/request'
import jwtDecode from 'jwt-decode'
export const addJudge =async (token,noiDung,sanPhamId)=>{
    try{
        const decodedToken = jwtDecode(token);
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const danhgia ={
            noiDung :noiDung,
            khachHangId :decodedToken.id,
            sanPhamId :sanPhamId
        }
        const res =await request.post(`/api/DanhGia`,danhgia,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const feedBack =async (token,noiDung,danhGiaId)=>{
    try{
        const decodedToken = jwtDecode(token);
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const res =await request.put(`/api/DanhGia/phan-hoi?id=${encodeURIComponent(danhGiaId)}&noiDung=${encodeURIComponent(noiDung)}`,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const getAllJudgeAdmin =async (token)=>{
    try{
        const decodedToken = jwtDecode(token);
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const res =await request.get(`/api/DanhGia/admin`,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const getAll =async (sanPhamId)=>{
    try{
        const res =await request.get(`/api/DanhGia?sanPhamId=${encodeURIComponent(sanPhamId)}`)
        return res
    }catch(error){
        console.log(error)
    }
}