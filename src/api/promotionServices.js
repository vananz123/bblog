import * as request from '../utils/request'

export const promotionAll  = async()=>{
    try{
        const res =await request.get('/api/KhuyenMai')
        return res
    }catch(error){
        console.log(error)
    }
}
export const promotionById  = async(id)=>{
    try{
        const res =await request.get(`/api/KhuyenMai/${encodeURIComponent(id)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const promotionAddNew  = async(data,token)=>{
    const promotion ={
        tuNgay:data.tuNgay,
        denNgay:data.denNgay,
        noiDung:data.noiDung
    }
    const option = {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    }
    try{
        const res =await request.post(`/api/KhuyenMai/`,promotion,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const promotionUpdate  = async(data,token)=>{
    const promotion ={
        id:data.id,
        tuNgay:data.tuNgay,
        denNgay:data.denNgay,
        noiDung:data.noiDung
    }
    const option = {
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`
        }
    }
    try{
        const res =await request.put(`/api/KhuyenMai/`,promotion,option)
        return res
    }catch(error){
        console.log(error)
    }
}