import { useEffect, useState } from "react";

import  * as categoryService from '~/api/categoryServices' 
import * as imageServices from '~/api/imageServices'
import { useParams } from "react-router-dom";
function CategoryForm({props}) {
    let {slug,id} = useParams()
    const [file, setFile] = useState([]);
    const [isKc,setIsKc] =useState(true)
    const [category, setCategory] = useState({})
    const handleFileChange = (event) => {
        console.log(event.target.files)
        setFile(event.target.files);
    }
    
    useEffect(()=>{
        const loadCate=async()=>{
            const resulf =await categoryService.categoryById(id)
            if(resulf != null){
                setCategory(resulf)
                setIsKc(resulf.kc)
            }
        }
        if(slug =='category-update'){
            loadCate()
        }
    },[])
    const handleCategoryChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCategory(values => ({...values, [name]: value}))
    }
    const handleSubmitForm= async(event)=>{
        event.preventDefault()
        console.log(file)
        console.log(category)
        const apiImage = await imageServices.imageAdd(file[0])
        if(apiImage != null){
            const token = localStorage.getItem("accsessToken")
            if(slug == 'category-update'){
                if(file.length > 0){
                    setCategory(category.img=apiImage)
                }
                const apiCate = await categoryService.categoryUpdate(category,token)
                if(apiCate != null){
                    alert("Cập nhật thành công")
                }else{
                    alert("Cập nhật không thành công")
                }
            }else{
                setCategory(category.img=apiImage)
                const apiCate = await categoryService.categoryAddNew(category,token)
                if(apiCate != null){
                    alert("Thêm thành công")
                }else{
                    alert("thêm không thành công")
                }
            }
            
        }else{
            alert("Lỗi ảnh")
        }
        
    }
    return <div>
        <form className="form-floating" onSubmit={handleSubmitForm}>
            <div className="form-floating mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    id="floatingInputValue" 
                    placeholder="Tên loại sản phẩm" 
                    name="ten"
                    value={category.ten || ''}
                    onChange={handleCategoryChange}
                    required/>
                <label htmlFor="floatingInputValue">Tên loại sản phẩm</label>
            </div>
            <div className="form-check mb-3">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value={isKc}
                    onClick={()=>{
                        setIsKc(!isKc)
                        setCategory(values => ({...values, kc: !isKc}))
                    }}
                    name="kc"
                    checked={isKc}
                    id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Kích cỡ
                </label>
            </div>

            {isKc ? <><div class="form-floating mb-3">
            <select name="loaiKc" value={category.loaiKc} onChange={handleCategoryChange} className="form-select" id="floatingSelect" aria-label="Floating label select example">
              
                <option selected value="CM">CM</option>
                <option value="Size">Size</option>
            </select>
            <label htmlFor="floatingSelect">Chọn đơn vị</label>
            </div>
            <div className="form-floating mb-3">
                <textarea 
                    name="doKc" value={category.doKc || ''} 
                    onChange={handleCategoryChange} 
                    className="form-control" 
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2" 
                    required
                    style={{height:"100px"}}></textarea>
                <label htmlFor="floatingTextarea2">Cách lấy kích cỡ</label>
            </div></>:''
            }

            <div className="mb-3">
                <label htmlFor="formFile" className="form-label" style={{marginLeft:"10px"}}>Default file input example</label>
                <input 
                    className="form-control" 
                    type="file" 
                    required
                    id="formFile" 
                    onChange={handleFileChange}/>
            </div>
            
            <button className="btn btn-primary" type="submit" >Lưu</button>
        </form>

    </div>;
}

export default CategoryForm;