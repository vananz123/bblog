import { Fragment, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as productServices from '~/api/productServices';
import * as promotionServices from '~/api/promotionServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowDown, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function PromotionList() {
    const [promotion, setPromotion] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const resulf = await promotionServices.promotionAll();
            if (resulf != null) {
                setPromotion(resulf);
            }
        };
        loadData();
    }, []);
    return (
        <div>
            <Link type="button" class="btn btn-primary mt-3 mb-3" to={`/admin/feature/promotion-add-new`}>
                <FontAwesomeIcon icon={faPlus} />
                Thêm mới
            </Link>
            <div class="accordion" id="accordionExample">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Từ ngày</th>
                            <th scope="col">Đến ngày</th>
                            <th scope="col">Nội dung</th>
                            <th scope="col">Hiệu lực</th>
                            <th scope="col" style={{ width: '200px' }}>
                                Chức năng
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {promotion.map((e, index) => (
                            <>
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{e.tuNgay}</td>
                                    <td>{e.denNgay}</td>
                                    <td>{e.noiDung}</td>
                                    <td>{e.hieuLuc ? 'Còn' : 'Không'}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-primary btn-sm"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            data-bs-whatever="@mdo"
                                        >
                                            <FontAwesomeIcon icon={faArrowDown} />
                                        </button>
                                        <Link
                                            to={`/admin/feature/promotion-update/${e.id}`}
                                            className="btn btn-primary btn-sm mx-2"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Link>
                                        <button type="button" className="btn btn-primary btn-sm ">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </button>
                                        <button
                                            class="btn btn-primary btn-sm mx-2"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#e${index}`}
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <FontAwesomeIcon icon={faArrowDown} />
                                        </button>
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
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                New message
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="recipient-name" class="col-form-label">
                                        Recipient:
                                    </label>
                                    <input type="text" class="form-control" id="recipient-name" />
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">
                                        Message:
                                    </label>
                                    <textarea class="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">
                                Send message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PromotionList;
