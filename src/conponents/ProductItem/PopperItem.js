import './style.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePromotionPrecent } from '~/hooks';
function PopperItem(props) {
    const d = props.data.sanpham;
    const [product, setProduct] = useState({});
    const [promotion, setPromotion] = useState({});
    const [img, setImg] = useState('');
    let promotionPrecent =usePromotionPrecent(product.giaBan,product.giaBanKm,promotion.hieuLuc)
    useEffect(() => {
        const loadImg = () => {
            const tt = props.data.sanpham;
            if (tt.img != null) {
                const str = tt.img;
                const imgList = str.split('*');
                setImg(imgList[0]);
            }
        };
        loadImg();
        if (props.data.khuyenmai != null) {
            setPromotion(props.data.khuyenmai);
        }
        setProduct(props.data.sanpham);
    });
    return (
       
        <Link
            to={`/product/detail/${product.id}`}
            className="popper-item d-flex ms-2 text-dark"
            style={{ textDecoration: 'none' }}
        >
            <div className="img rounded">
                <img src={img} alt="..." />
            </div>
            <div className="info-item m-1">
                <p className="">{product.ten}</p>
                {Object.keys(promotion) ===0 ? (
                    <strong className="card-text">{ChangeCurrence(product.giaBan)}</strong>
                ) : (
                    <p className="card-text">
                        <strong className="card-text text-danger">
                            {ChangeCurrence(product.giaBanKm)}
                            <sup> -{promotionPrecent}</sup>
                        </strong>
                    </p>
                )}
            </div>
        </Link>
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
export default PopperItem;
