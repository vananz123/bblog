import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as categoryServices from '~/api/categoryServices'
import * as imageServices from '~/api/imageServices'
import * as productServices from '~/api/productServices'
import KCForm from "./KCForm";
function ProductFormUpdate() {
    let {id} = useParams()
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
    useEffect(()=>{
        const loadProdcut = async()=>{
            const resulf = await productServices.productById(id)
            if(resulf != null){
                setProduct(resulf.sanpham)
                setListKC(resulf.kichco)
            }
        }
        loadProdcut()
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
        if(resulf !=null){
            if(product.loaiSanPhamId =="0" || "loaiSanPhamId" in product ==false ){
                return alert("lỗi loại sản phẩm")
            }else{
                if(file.length > 0){
                    product.img = resulf
                }
                const apiUpdate = await productServices.productUpdate(product,listKC,token)
                if(apiUpdate != null){
                    alert("cập nhật thành công")
                }else{
                    alert("cập nhật không thành công")
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
                id="floatingInputValue" 
                placeholder="Tên sản phẩm" 
                value={product.ten || ''}
                onChange={handleProductChange}/>
            <label htmlFor="floatingInputValue">Tên sản phẩm</label>
            </div>
            <div className="form-floating mb-3">
                <input 
                    type="number" 
                    className="form-control" 
                    name="giaBan"
                    id="floatingPassword" 
                    placeholder="Giá bán (VNG)"
                    value={product.giaBan || 0}
                    onChange={handleProductChange}/>
                <label htmlFor="floatingPassword">Giá bán</label>
            </div>
            <div className="form-floating mb-3">
                <textarea 
                    className="form-control" 
                    name="moTa"
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2" 
                    style={{height:"100px"}} 
                    value={product.moTa || ''}
                    onChange={handleProductChange}></textarea>
                <label htmlFor="floatingTextarea2">Mô tả sản phẩm</label>
            </div>
            <div className="form-floating mb-3">
                <select 
                    className="form-select" 
                    id="floatingSelect" 
                    name="loaiSanPhamId" 
                    onChange={handleProductChange}
                    value={product.loaiSanPhamId}
                    aria-label="Floating label select example">
                    {category.map((e,index)=>(
                        
                        loadSelect(e,index)
                    ))}
                </select>
                <label htmlFor="floatingSelect">Loại sản phẩm</label>
            </div>
            <div className="mb-3">
            <label  className="form-label" style={{marginLeft:"10px"}}>Thêm kích cở cho sản phẩm</label>
                <KCForm onListKCChange={setListKC}/>
            </div>
            <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label" style={{marginLeft:"10px"}}>Thêm ảnh cho sản phẩm</label>
                <input 
                    className="form-control" 
                    type="file" 
                    id="formFileMultiple" 
                    multiple 
                    onChange={handleFileChange} />
            </div>
            <button className="btn btn-primary" type="submit">Lưu</button>
        </form>

    </div>;
}

export default ProductFormUpdate;