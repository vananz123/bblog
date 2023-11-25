import { useEffect, useState } from "react";

import KCForm from "./KCForm";
import * as categoryServices from '~/api/categoryServices'
import * as imageServices from '~/api/imageServices'
import * as productServices from '~/api/productServices'
function ProductForm(props) {
    const [file, setFile] = useState([]);
    const [category, setCategory] =useState([])
    const [product, setProduct]= useState({})
    const [listKC, setListKC]= useState([])
    const token =window.localStorage.getItem("accsessToken")
    useEffect(()=>{
        const loadCate = async()=>{
            const resulf = await categoryServices.categoryAll()
            if(resulf !=null){
                setCategory(resulf)
            }
        }
        loadCate()
    },[])
    const handleProductChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setProduct(values => ({...values, [name]: value}))
    }
    const handleFileChange = (event) => {
        console.log(event.target.files)
        setFile(event.target.files);
    }
    const submitForm= async (event)=>{
        event.preventDefault()
        const resulf =await imageServices.imagesAdd(file)
        if(resulf != null){
            if(product.loaiSanPhamId =="0" || "loaiSanPhamId" in product ==false ){
                return alert("lỗi loại sản phẩm")
            }else{
                product.img = resulf
                const api = await productServices.productAddNew(product,listKC,token)
                if(api != null){
                    alert("oke")
                }else{
                    alert("no")
                }
            }
            
        }
    }
    const loadSelect=(e,index)=>{
        return <option key={e.id} value={e.id}>{e.ten}</option>
    }
    
    return <div>
        <form className="form-floating" onSubmit={submitForm}>
            <div className="form-floating mb-3">
            <input 
                type="text" 
                className="form-control" 
                name="ten"
                value={product.ten || ""}
                id="floatingInputValue" 
                placeholder="Tên sản phẩm" 
                required
                onChange={handleProductChange}/>
            <label htmlFor="floatingInputValue">Tên sản phẩm</label>
            </div>
            <div className="form-floating mb-3">
                <input 
                    type="number" 
                    className="form-control" 
                    name="giaBan"
                    value={product.giaBan || 0}
                    id="floatingPassword" 
                    placeholder="Giá bán (VNG)"
                    required
                    onChange={handleProductChange}/>
                <label htmlFor="floatingPassword">Giá bán</label>
            </div>
            <div className="form-floating mb-3">
                <textarea 
                    className="form-control" 
                    name="moTa"
                    value={product.moTa || ""}
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2" 
                    style={{height:"100px"}} 
                    onChange={handleProductChange}></textarea>
                <label htmlFor="floatingTextarea2">Mô tả sản phẩm</label>
            </div>
            <div className="form-floating mb-3">
                <select 
                    className="form-select" 
                    id="floatingSelect" 
                    name="loaiSanPhamId" 
                    value={product.loaiSanPhamId || 0}
                    required
                    onChange={handleProductChange}
                    aria-label="Floating label select example">
                    <option value={0}>Chọn loại cho sản phẩm</option>
                    {category.map((e,index)=>(
                        
                        loadSelect(e,index)
                    ))}
                </select>
                <label htmlFor="floatingSelect">Loại sản phẩm</label>
            </div>
            <div className="mb-3">
            <label  className="form-label" style={{marginLeft:"10px"}}>Thêm kích cở cho sản phẩm</label>
                <KCForm onListKCChange={setListKC} data={[]}/>
            </div>
            <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label" style={{marginLeft:"10px"}}>Thêm ảnh cho sản phẩm</label>
                <input 
                    className="form-control" 
                    type="file" 
                    required
                    id="formFileMultiple" 
                    multiple 
                    onChange={handleFileChange} />
            </div>
            <button className="btn btn-primary" type="submit" >Lưu</button>
        </form>

    </div>;
}

export default ProductForm;