import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping, faMinus, faPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { addCartProduct } from '../../redux/actions/action';
import './style.scss';
import * as productServices from '../../api/productServices';
import * as judgeServices from '~/api/judgeServices'
import { useState, useEffect, Fragment, useRef } from 'react';
import { PopperItem } from '~/conponents/ProductItem';
import { usePromotionPrecent } from '~/hooks';
function ProductDetail(props) {
    let { id } = useParams();
    const [listJudge,setListJudge] =useState([])
    const [listProductSimilar ,setListProductSimilar] =useState([])
    const [category, setCategory] = useState(null);
    const [product, setProduct] = useState({});
    const [listKC, setListKC] = useState(null);
    const [promotion, setPromotion] = useState({});
    const [imgList, setImgList] = useState([]);
    const [soLuong, setSoLuong] = useState(1);
    const inputKC = useRef();
    let promotionPrecent = usePromotionPrecent(product.giaBan, product.giaBanKm, promotion.hieuLuc);
    const handlePlus = () => {
        const sl = soLuong + 1;
        setSoLuong(sl);
    };
    const handleMinus = () => {
        const sl = soLuong - 1;
        if (sl >= 1) {
            setSoLuong(sl);
        }
    };
    useEffect(() => {
        const getProductByCate = async () => {
            const resulf = await productServices.productById(id);
            if (resulf != null) {
                
                setCategory(resulf.loaisanpham);
                setProduct(resulf.sanpham);
                setListKC(resulf.kichco);
                if (resulf.sanpham.img != null) {
                    const str = resulf.sanpham.img;
                    const imgList = str.split('*');
                    imgList.pop();
                    setImgList(imgList);
                }
                if (resulf.sanpham.khuyenMaiId != null) {
                    setPromotion(resulf.khuyenmai);
                }
            }
        };
        const getJudge =async()=>{
            const resuft =await judgeServices.getAll(id)
            if(resuft != null){
                setListJudge(resuft)
                console.log(resuft)
            }
        }
        const getListProSimilar=async()=>{
            const resulf =await productServices.productAll()
            if(resulf != null){
                setListProductSimilar(resulf)
            }
        }
        getProductByCate();
        getListProSimilar();
        getJudge();
    }, [id]);
    const addCart = () => {
        if (listKC != null) {
            let kc;
            listKC.forEach((e, index) => {
                if (e.id == inputKC.current.value) {
                    kc = e;
                }
            });
            let tt =product.giaBan* soLuong
            const cart = {
                sanPhamId: product.id,
                ten: product.ten,
                giaBan: product.giaBan,
                giaBanKm: product.giaBanKm,
                tongGia:tt,
                giaGiam:tt - (product.giaBanKm*soLuong),
                kichCo: kc.ten,
                loaiKc:category.loaiKc,
                soLuong: soLuong,
                img: imgList[0],
            };
            props.addCartProduct(cart);
        }
    };
    const loadSelect = (e, category, index) => {
        return (
            <option key={index} value={e.id}>
                {e.ten} {category.loaiKc}
            </option>
        );
    };
    return (
        <div className="product-detail">
            {Object.keys(product) != 0 ? (
                <>
                    {' '}
                    <section className="py-5">
                        <div className="container">
                            <div className="row gx-5">
                                <aside className="col-lg-6">
                                    <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                        <a
                                            data-fslightbox="mygalley"
                                            className="rounded-4"
                                            target="_blank"
                                            data-type="image"
                                            href={imgList[0]}
                                        >
                                            <img
                                                style={{ maxWidth: '100%', maxHeight: '100vh', margin: 'auto' }}
                                                className="rounded-4 fit"
                                                src={imgList[0]}
                                            />
                                        </a>
                                    </div>
                                    <div className="d-flex justify-content-center mb-3">
                                        {imgList ? (
                                            imgList.map((e, index) => (
                                                <>
                                                    <a
                                                        key={index}
                                                        data-fslightbox="mygalley"
                                                        className="border mx-1 rounded-2 item-thumb"
                                                        target="_blank"
                                                        data-type="image"
                                                        href={e}
                                                    >
                                                        <img width="60" height="60" className="rounded-2" src={e} />
                                                    </a>
                                                </>
                                            ))
                                        ) : (
                                            <Fragment />
                                        )}
                                    </div>
                                </aside>
                                <main className="col-lg-6">
                                    {Object.keys(promotion) != 0 ? (
                                        <>
                                            <div className="ps-lg-3">
                                                <h4 className="title text-danger text-uppercase">
                                                    <FontAwesomeIcon icon={faTag} /> {promotion.noiDung}
                                                </h4>
                                            </div>
                                            <hr />
                                        </>
                                    ) : (
                                        ''
                                    )}
                                    <div className="ps-lg-3">
                                        <h5 className="title text-dark">{product.ten}</h5>
                                        <div className="d-flex flex-row my-3">
                                            <span className="text-muted">
                                                <FontAwesomeIcon icon={faBasketShopping} />
                                                150 Đơn hàng
                                            </span>
                                            <span className="text-success ms-2">In stock</span>
                                        </div>

                                        <div className="mb-3">
                                            {Object.keys(promotion) === 0 ? (
                                                <p className="card-text">{ChangeCurrence(product.giaBan)}</p>
                                            ) : (
                                                <p className="card-text">
                                                    <strong className="card-text text-danger">
                                                        {ChangeCurrence(product.giaBanKm)}
                                                        <sup> -{promotionPrecent}</sup>
                                                    </strong>
                                                </p>
                                            )}
                                        </div>
                                        <hr />
                                        <p>{product.moTa}</p>

                                        <div className="row">
                                            <dt className="col-3">Tên sản phẩm: </dt>
                                            <dd className="col-9">{product.ten}</dd>

                                            <dt className="col-3">Thương hiệu: </dt>
                                            <dd className="col-9">Van An</dd>
                                        </div>

                                        <hr />
                                        <div className="row">
                                            <dt className="col-3">Cách chọn kích cỡ </dt>
                                            <dd className="col-9">{category.doKc}</dd>
                                        </div>
                                        <hr />
                                        <div className="row mb-4">
                                            <div className="col-md-4 col-6">
                                                <label className="mb-2">Cở</label>
                                                <select
                                                    ref={inputKC}
                                                    className="form-select border border-secondary"
                                                    style={{ height: '35px' }}
                                                >
                                                    {listKC ? (
                                                        listKC.map((e, index) => loadSelect(e, category, index))
                                                    ) : (
                                                        <Fragment />
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-md-4 col-6 mb-3">
                                                <label className="mb-2 d-block">Số lượng</label>
                                                <div className="input-group mb-3" style={{ width: '170px' }}>
                                                    <button
                                                        onClick={() => {
                                                            handleMinus();
                                                        }}
                                                        className="btn btn-white border border-secondary px-3"
                                                        type="button"
                                                        id="button-addon1"
                                                        data-mdb-ripple-color="dark"
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="form-control text-center border border-secondary"
                                                        value={soLuong}
                                                        aria-label="Example text with button addon"
                                                        readOnly
                                                        aria-describedby="button-addon1"
                                                    />
                                                    <button
                                                        onClick={() => {
                                                            handlePlus();
                                                        }}
                                                        className="btn btn-white border border-secondary px-3"
                                                        type="button"
                                                        id="button-addon2"
                                                        data-mdb-ripple-color="dark"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-warning shadow-0">Mua ngay</button>
                                        <button
                                            className="btn btn-primary shadow-0 mx-3"
                                            onClick={() => {
                                                addCart();
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faBasketShopping} />
                                            Thêm vào giỏ hàng
                                        </button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </section>
                    <section className="bg-light border-top py-4">
                        <div className="container">
                            <div className="row gx-4">
                                <div className="col-lg-8 mb-4">
                                    <div className="border rounded-2 px-3 py-2 bg-white">
                                        <h5>Đánh giá</h5>
                                        <ul class="list-group list-group-flush">
                                            {listJudge.map((e,index)=>(
                                                <li class="list-group-item ">
                                                <div class="ms-2 me-auto">
                                                    <div class="fw-bold">{e.ho} {e.ten}</div>
                                                    {e.noiDung}
                                                </div>
                                                {e.phanHoi != null? <div class="list-group-item d-flex justify-content-between align-items-start">
                                                        <div class="ms-2 me-auto">
                                                        <div class="fw-bold ">Cửa hàng</div>
                                                        {e.phanHoi}
                                                        </div>
                                                    </div>:''}
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="px-0 border rounded-2 shadow-0">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Sản phẩm tương tự</h5>
                                                {listProductSimilar.map((e,index)=>(
                                                   <div className="d-flex mb-3">
                                                   <PopperItem data ={e}/>
                                                    </div> 
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>{' '}
                </>
            ) : (
                <Fragment />
            )}
        </div>
    );
}
const ChangeCurrence = (number) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return null;
};
const mapDispatchToProps = (dispatch) => {
    return {
        addCartProduct: (product_current) => dispatch(addCartProduct(product_current)),
    };
};
const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
