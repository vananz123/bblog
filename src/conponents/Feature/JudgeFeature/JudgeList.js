import { useEffect, useState,useRef } from "react";
import { Link, NavLink } from 'react-router-dom'
import * as categoryServices from '~/api/categoryServices'
import * as judgeServices from '~/api/judgeServices'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faArrowDown,
    faTrashCan,
    faPenToSquare
  } from '@fortawesome/free-solid-svg-icons'
function JudgeList() {
    const [listJudge,setListJudge] =useState([]) 
    const [danhGiaId,setDanhGiaId] =useState(0)
    const [noiDung,setNoiDung] = useState(null)
    useEffect(()=>{
        const token = localStorage.getItem("accsessToken")
        const loadData =async()=>{
            const resulf = await judgeServices.getAllJudgeAdmin(token)
            if(resulf !=null){
                setListJudge(resulf)
            }
        }
        loadData()
    },[])
    const FeedBack =async()=>{
        const token = localStorage.getItem("accsessToken")
        const resuft =await judgeServices.feedBack(token,noiDung,danhGiaId)
        if(resuft != null){
            alert("Thành công")
        }
    }
    return <div>
    <div class="accordion" id="accordionExample">
    <table className="table table-hover table-bordered">
            <thead className="table-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Sđt</th>
                    <th scope="col">Tên sản phẩm</th>
                    <th scope="col">Nội dung</th>
                    <th scope="col">Ngày đánh giá</th>
                    <th scope="col" style={{width:"200px"}}>Chức năng</th>
                </tr>
            </thead>
            <tbody>
                {listJudge.map((e,index)=>(
                    <><tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{e.khachhang.ho} {e.khachhang.ten}</td>
                        <td>{e.khachhang.sdt}</td>
                        <td>{e.sanpham.ten}</td>
                        <td>{e.danhgia.noiDung}</td>
                        <td>{e.danhgia.ngayTao}</td>
                        <td>
                            <Link to ={`/admin/feature/category-update/${e.id}`} className="btn btn-primary btn-sm mx-2"><FontAwesomeIcon icon={faPenToSquare} /></Link>
                            <button type="button" className="btn btn-primary btn-sm " data-bs-toggle="modal"
                                                                                        data-bs-target="#exampleModal"  onClick={()=>(setDanhGiaId(e.danhgia.id))} ><FontAwesomeIcon icon={faTrashCan} /></button>
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
    <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Phản hồi
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">
                                        Nội dung
                                    </label>
                                    <textarea onChange={(event)=>{setNoiDung(event.target.value)}} class="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Đóng
                            </button>
                            <button type="button" class="btn btn-primary" onClick={()=>{FeedBack()}}>
                                Hoàn tất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
</div>;
}

export default JudgeList;