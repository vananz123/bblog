import * as request from '../utils/request'

export const imagesAdd  = async(data)=>{
    try{
        const formData = new FormData()
        for (const file of data) {
            formData.append('fileImages',file);
        }
        console.log(formData)
        const option = {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        }
        const res =await request.post('/api/Image/upload-images',formData,option)
        return res
    }catch(error){
        console.log(error)
    }
}
export const imageAdd  = async(data)=>{
    try{
        const formData = new FormData()
        formData.append('fileImages',data);
        const option = {
            headers: {
                'Content-Type': 'multipart/form-data',
              }
        }
        const res =await request.post('/api/Image/upload-image',formData)
        return res
    }catch(error){
        console.log(error)
    }
}