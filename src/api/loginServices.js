import * as request from '../utils/request'
import jwtDecode from "jwt-decode";
export const checkStd  = async(checkStd)=>{
    try{
        const res =await request.post(`/api/User/sdt?sdt=${encodeURIComponent(checkStd)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const login = async(data)=>{
    try{
        const res = await request.post(`/api/User/login`,data)
        return res
    }catch(error){
        console.log(error)
    }
}
export const register = async(data)=>{
    try{
        const user ={
            ho: data.ho,
            ten: data.ten,
            email: data.email,
            sdt: data.sdt,
            diaChi: "",
            password: data.password,
            vaiTro:"KH"
        }
        const res = await request.post(`/api/User/register`,user)
        return res
    }catch(error){
        console.log(error)
    }
}
export const getUser =async (token)=>{
    try{
        const decodedToken = jwtDecode(token);
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const res =await request.get(`/api/User/${encodeURIComponent(decodedToken.id)}`,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const updateKH =async (kh)=>{
    try{
        const khachHang = {
            ho: kh.ho,
            ten:kh.ten,
            email:kh.email,
            sdt:kh.sdt,
            diaChi: kh.diaChi
        }
        const res =await request.post('/api/User/khach-hang/update',khachHang)
        return res
    }catch(error){
        console.log(error)
    }
}