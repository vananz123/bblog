import { Fragment, useEffect, useRef, useState } from "react";

function KCFormUpdate(props) {
    const [inputKC, setInputKC] = useState({
        sanPhamId:"",
    })
    const [listKC, setListKC]= useState(props.data)
    const handleInputKCChange =(event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputKC(values => ({...values, [name]: value}))
    }
    const AddRowTable =()=>{
        setListKC(values=> [...values,inputKC])
        props.onListKCChange(listKC)
    }
    const delListKC = (index)=>{
        var filtered = listKC.filter(function(value, id, arr) {
            return id != index;
        });
        setListKC(filtered)
        props.onListKCChange(listKC)
    }
    useEffect(()=>{
        const setListToParent=()=>{
            props.onListKCChange(listKC)
        }
        setListToParent()
    },[listKC])
    return <div>
        <table className="table table-hover table-bordered">
            <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Số CM</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Xóa</th>
                </tr>
            </thead>
            <tbody>
                {listKC.map((e,index)=>(
                    <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{e.ten}</td>
                        <td>{e.soLuong}</td>
                        <td>
                            <button type="button" className="btn btn-primary btn-sm" onClick={()=>{delListKC(index)}}>Xóa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Thêm</button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm kích cở</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Số CM</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="ten"
                                onChange={handleInputKCChange}    />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Số lượng</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="soLuong"
                                onChange={handleInputKCChange}    />
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" className="btn btn-primary" onClick={()=>{AddRowTable()}} data-bs-dismiss="modal">Thêm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default KCFormUpdate;