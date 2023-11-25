import { Fragment, useEffect, useState } from 'react';
import * as productServices from '~/api/productServices';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
function ProductList() {
    const [product, setProduct] = useState([]);
    const token = window.localStorage.getItem('accsessToken');
    useEffect(() => {
        const getProductAll = async () => {
            const resulf = await productServices.productAll();
            if (resulf != null) {
                setProduct(resulf);
            }
        };
        getProductAll();
    }, []);
    const productDelete = async (id) => {
        let text = 'Bạn chắc chắn muốn xóa!';
        if (window.confirm(text) == true) {
            const resulf = await productServices.productDelete(id, token);
            window.location.reload();
        } else {
            text = 'You canceled!';
        }
    };
    return (
        <div>
            <Link type="button" class="btn btn-primary mt-3 mb-3" to={`/admin/feature/product-add-new`}>
                <FontAwesomeIcon icon={faPlus} />
                Thêm mới
            </Link>
            <table className="table table-hover table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá tiền</th>
                        <th scope="col">Giá cũ</th>
                        <th scope="col">Giá km</th>
                        <th scope="col">Loại sản phẩm</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Hot</th>
                        <th scope="col">New</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((e, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{e.sanpham.ten}</td>
                            <td>{e.sanpham.giaBan}</td>
                            <td>{e.sanpham.giaBanCu}</td>
                            <td>{e.sanpham.giaBanKm}</td>
                            <td>{e.sanpham.tenLoai}</td>
                            <td>{e.sanpham.moTa}</td>
                            <td>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={e.sanpham.banChay}
                                        id="flexCheckDefault"
                                    />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Hot
                                    </label>
                                </div>
                            </td>
                            <td>
                                <div class="form-check">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value={e.sanpham.moi}
                                        id="flexCheckDefault"
                                    />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        New
                                    </label>
                                </div>
                            </td>
                            <td>
                                <Link to={`/admin/feature/product-update/${e.sanpham.id}`}>
                                    <button type="button" className="btn btn-primary btn-sm mx-3">
                                        Sửa
                                    </button>
                                </Link>
                                <button
                                    type="button"
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        productDelete(e.sanpham.id);
                                    }}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
