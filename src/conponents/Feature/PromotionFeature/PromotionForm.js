import { useEffect, useState } from 'react';
import * as promotionServices from '~/api/promotionServices';
import { useParams } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
function PromotionForm() {
    let {slug,id} = useParams()
    const [tuNgay, setTuNgay] = useState(new Date());
    const [denNgay, setDenNgay] = useState(new Date());
    const [promotion, setPromotion] = useState({});
    useEffect(()=>{
        const loadData =async ()=>{
            const resulf =await promotionServices.promotionById(id)
            if(resulf != null){
                setPromotion(resulf)
                setTuNgay(Date.parse(resulf.tuNgay))
                setDenNgay(Date.parse(resulf.denNgay))
            }
        }
        if(slug =="promotion-update"){
            loadData()
        }
    },[])
    const handlePromotionChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPromotion((values) => ({ ...values, [name]: value }));
    };
    const handleSubmitForm =async (event) => {
        event.preventDefault();
        console.log(promotion);
        
        const token = localStorage.getItem("accsessToken")
        if(slug =='promotion-update'){
            console.log(tuNgay.toISOString());
            promotion.tuNgay =tuNgay.toISOString()
            promotion.denNgay = denNgay.toISOString()
            const resulf =await promotionServices.promotionUpdate(promotion,token)
            if(resulf != null){
                alert("update thành công")
            }else{
                alert("ko thành công")
            }
        }else{
            promotion.tuNgay =tuNgay.toISOString()
            promotion.denNgay = denNgay.toISOString()
            const resulf =await promotionServices.promotionAddNew(promotion,token)
            if(resulf != null){
                alert("thêm thành công")
            }else{
                alert("ko thành công")
            }
        }
    };
    return (
        <div>
            <form className="form-floating" onSubmit={handleSubmitForm}>
                <div>
                    <span>Từ Ngày</span>
                <DateTimePicker onChange={setTuNgay} value={tuNgay} format='y-MM-dd h:mm:ss'/>
                <span>Đến Ngày</span>
                <DateTimePicker onChange={setDenNgay} value={denNgay} format='y-MM-dd h:mm:ss'/>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        name="noiDung"
                        value={promotion.noiDung || ''}
                        onChange={handlePromotionChange}
                        className="form-control"
                        placeholder="Nội dung"
                        id="floatingTextarea2"
                        required
                        style={{ height: '100px' }}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Nội dung</label>
                </div>
                <button className="btn btn-primary" type="submit">
                    Lưu
                </button>
            </form>
        </div>
    );
}

export default PromotionForm;
