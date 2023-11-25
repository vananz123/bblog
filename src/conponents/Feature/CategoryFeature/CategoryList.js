import { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import * as categoryServices from '~/api/categoryServices'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faArrowDown,
    faTrashCan,
    faPenToSquare
  } from '@fortawesome/free-solid-svg-icons'
function CategoryList() {
    const [category, setCategory] = useState([])
    useEffect(()=>{
        const loadCate =async()=>{
            const resulf = await categoryServices.categoryAll()
            if(resulf !=null){
                setCategory(resulf)
            }
        }
        loadCate()
    },[])
    return <div>
        <Link type="button" class="btn btn-primary mt-3 mb-3" to={`/admin/feature/category-add-new`}>
                <FontAwesomeIcon icon={faPlus} />
                Thêm mới
            </Link>
        <div class="accordion" id="accordionExample">
        <table className="table table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên loại</th>
                        <th scope="col">Kích cỡ</th>
                        <th scope="col">Đơn vị</th>
                        <th scope="col" style={{width:"200px"}}>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((e,index)=>(
                        <><tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{e.ten}</td>
                            <td>{e.kc ? "Có"  : "Không"}</td>
                            <td>{e.loaiKc}</td>
                            <td>
                                <Link to ={`/admin/feature/category-update/${e.id}`} className="btn btn-primary btn-sm mx-2"><FontAwesomeIcon icon={faPenToSquare} /></Link>
                                <button type="button" className="btn btn-primary btn-sm " ><FontAwesomeIcon icon={faTrashCan} /></button>
                                <button class="btn btn-primary btn-sm mx-2" data-bs-toggle="collapse" data-bs-target={`#e${index}`} aria-expanded="true" aria-controls="collapseOne"><FontAwesomeIcon icon={faArrowDown} /></button>
                            </td>
                        </tr>
                        <tr id={`e${index}`} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                              
                                <td colSpan={5}>
                                <div style={{width:"300px"}}>
                                        <p className='fs-5'>Cách đo kích cỡ</p>
                                        <p>{e.doKc}</p>
                                    </div>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
        </div>
    </div>;
}

export default CategoryList;