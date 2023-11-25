import * as request from '../utils/request'

export const productAll  = async()=>{
    try{
        const res =await request.get('/api/SanPham')
        return res
    }catch(error){
        console.log(error)
    }
}
export const productByCid  = async(id)=>{
    try{
        const res =await request.get(`/api/SanPham/loai/${encodeURIComponent(id)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const productById  = async(id)=>{
    try{
        const res =await request.get(`/api/SanPham/${encodeURIComponent(id)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const productForKM  = async(id)=>{
    try{
        const res =await request.get(`/api/KhuyenMai/${encodeURIComponent(id)}`)
        return res
    }catch(error){
        console.log(error)
    }
}
export const productAddNew  = async(data,listKC,token)=>{
    try{
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const product ={
            ten: data.ten,
            giaBan: data.giaBan,
            moTa: data.moTa,
            img: data.img,
            loaiSanPhamId: data.loaiSanPhamId
        }
        const apiproduct =await request.post(`/api/SanPham/add-product`,product,option)
        const list =[]
        listKC.map((e)=>{
            const kc ={
                ten: e.ten,
                soLuong: e.soLuong,
                sanPhamId: apiproduct.id
            }
            list.push(kc)
        })
        const apikc =await request.post('/api/KichCo',list)
        return apiproduct
    }catch(error){
        console.log(error)
    }
}
export const productUpdate  = async(data,listKC,token)=>{
    try{
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const product ={
            id:data.id,
            ten: data.ten,
            giaBan: data.giaBan,
            moTa: data.moTa,
            img: data.img,
            loaiSanPhamId: data.loaiSanPhamId
        }
        const apiproduct =await request.put(`/api/SanPham/update-product`,product,option)
        const list =[]
        listKC.map((e)=>{
            const kc ={
                id:e.id,
                ten: e.ten,
                soLuong: e.soLuong
            }
            list.push(kc)
        })
        const apikc =await request.put('/api/KichCo',list)
        return apiproduct
    }catch(error){
        console.log(error)
    }
}
export const productDelete  = async(id,token)=>{
    try{
        const option = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        }
        const res =await request.del(`/api/SanPham/delete-product?id=${encodeURIComponent(id)}`,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const productSearch  = async(q)=>{
    try{
        const res =await request.get(`/api/SanPham/search?q=${encodeURIComponent(q)}`,)
        return res
    }catch(error){
        console.log(error)
    }
}
export const productGetKC  = async(productId)=>{
    try{
       
        const res =await request.get(`/api/KichCo?id=${encodeURIComponent(productId)}`)
        return res
    }catch(error){
        console.log(error)
    }
}