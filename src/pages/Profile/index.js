import { Fragment, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faX, faCheck, faCircleXmark, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import * as orderServices from '../../api/orderServices';
import * as loginServices from '../../api/loginServices';
import * as judgeServices from '~/api/judgeServices';
import { connect } from 'react-redux';
import { delUserAPI } from '~/redux/actions/action';
import './style.scss';
import { event } from 'jquery';
const Profile = (props) => {
    const [user, setUser] = useState({});
    const [isClick, setIsClick] = useState(true);
    const [order, setOrder] = useState([]);

    const [sanPhamId,setSanPhamId] =useState(0)
    const inputRef = useRef();
    const [noiDung,setNoiDung] = useState(null)
    useEffect(() => {
        const token = localStorage.getItem('accsessToken');
        const loadUser = () => {
            if (Object.keys(props.currentUser).length === 0) {
                window.localStorage.removeItem('accsessToken');
                window.location.href = '/login';
            } else {
                setUser(props.currentUser.data);
            }
        };
        const loadOrder = async () => {
            const resulf = await orderServices.OrderAllByIdKh(token);
            if (resulf != null) {
                setOrder(resulf);
            }
        };
        loadUser();
        loadOrder();
    }, [isClick]);
    const handleAddressChange = (event) => {
        setUser((value) => ({ ...value, [event.target.name]: inputRef }));
    };
    const addJudge = async() => {
        const token = localStorage.getItem('accsessToken');
        const resulf =await judgeServices.addJudge(token,noiDung,sanPhamId)
        if(resulf =="Thành công"){
            alert("đánh giá thành công")
        }
    };
    const logout = () => {
        props.delUserAPI();
        window.localStorage.removeItem('accsessToken');
        window.location.href = '/';
    };
    return (
        <div className="profile">
            <div>Thông tin tài khoản</div>
            <div className="row title">
                <div className="col-sm-2">
                    <div className="name">{user.ho + ' ' + user.ten}</div>
                </div>
                <div className="col-sm-8">
                    <div className="content-title">
                        {isClick ? (
                            <>
                                <div className="fs-5">
                                    <p>Thông tin địa chỉ</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="fs-5">
                                    <p>Đơn hàng đã mua</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <div className="user-info">
                        <div className="mt-3">
                            <button
                                type="button"
                                className={isClick ? 'btn btn-light active' : 'btn btn-light'}
                                onClick={() => setIsClick(true)}
                            >
                                Thông tin và địa chỉ
                            </button>
                        </div>
                        <div className="mt-3">
                            <button
                                type="button"
                                className={isClick ? 'btn btn-light' : 'btn btn-light active'}
                                onClick={() => setIsClick(false)}
                            >
                                Đơn hàng đã mua
                            </button>
                        </div>
                        <div className="mt-3">
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => {
                                    logout();
                                }}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="content">
                        {isClick == false ? (
                            <>
                                <div className="accordion" id="accordionExample">
                                    <table className="table table-bordered">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Ngày đặt</th>
                                                <th scope="col">Thanh toán</th>
                                                <th scope="col">Loại TT</th>
                                                <th scope="col">Tổng tiền</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {order.map((e, index) => (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{e.donhang.ngayDat}</td>
                                                        <td>
                                                            {e.donhang.thanhToan ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                        </td>
                                                        <td>
                                                            {e.donhang.loaiThanhToan == 1
                                                                ? 'Thanh toán khi nhận hàng'
                                                                : 'Thanh toán momo'}
                                                        </td>
                                                        <td>{e.donhang.tongTien - e.donhang.tongTienGiam}</td>
                                                        <td>{e.donhang.status ? 'Đã xác nhận' : 'Chưa xác nhận'}</td>

                                                        <td>
                                                            <button
                                                                className="btn btn-primary btn-sm"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target={`#e${index}`}
                                                                aria-expanded="true"
                                                                aria-controls="collapseOne"
                                                            >
                                                                <FontAwesomeIcon icon={faArrowDown} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr
                                                        id={`e${index}`}
                                                        className="accordion-collapse collapse"
                                                        aria-labelledby="headingOne"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <td colSpan={7}>
                                                            <div className="accordion-body">
                                                                <table className="table">
                                                                    <thead>
                                                                        <tr>
                                                                            <th scope="col">#</th>
                                                                            <th scope="col">Tên</th>
                                                                            <th scope="col">Giá</th>
                                                                            <th scope="col">Số lượng</th>
                                                                            <th scope="col">Kích cỡ</th>
                                                                            <th scope="col" style={{ width: '200px' }}>
                                                                                Đánh giá
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {e.gr.map((od, index) => (
                                                                            <tr>
                                                                                <th scope="row">{index + 1}</th>
                                                                                <td>{od.sanpham.ten}</td>
                                                                                <td>
                                                                                    {od.sanpham.giaBanKm ||
                                                                                        od.sanpham.giaBan}
                                                                                </td>
                                                                                <td>{od.chitiethoadon.soLuong}</td>
                                                                                <td>{od.chitiethoadon.kichCo}</td>
                                                                                <td>
                                                                                    <button
                                                                                        className="btn btn-primary btn-sm"
                                                                                        data-bs-toggle="modal"
                                                                                        data-bs-target="#exampleModal"
                                                                                        onClick={()=>(setSanPhamId(od.sanpham.id))}
                                                                                    >
                                                                                        Đánh giá sản phẩm
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <form className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="floatingInputValue"
                                            name="diaChi"
                                            ref={inputRef}
                                            value={user.diaChi || ''}
                                            onChange={handleAddressChange}
                                            placeholder="name@example.com"
                                        />
                                        <label for="floatingInputValue">Địa chỉ</label>
                                    </form>
                                    <button type="button" className="btn btn-primary" >
                                        Cập nhật
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
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
                                Đánh giá sản phẩm
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
                            <button type="button" class="btn btn-primary" onClick={()=>(addJudge())}>
                                Hoàn tất
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        delUserAPI: () => dispatch(delUserAPI()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
