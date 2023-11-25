import { Link } from "react-router-dom";
import queryString from 'query-string'
import { useEffect, useState } from "react";
import * as orderService from '../../api/orderServices'
function PaySuccess() {
    let p =queryString.parse(window.location.search)
    console.log(p.vnp_OrderInfo)
    const [text,setText] =useState()
    useEffect(()=>{
        switch(p.vnp_ResponseCode){
            case "00":
                var list = p.vnp_OrderInfo.split(' ')
                orderService.OrderPaymentStatus(list[0])
                setText('Thanh toán thành công')
                break
            case "24":
                setText("Thanh toán thất bại")
                break
            default:
                setText("Lỗi thanh toán")
        }
    })
    return <div>
        <p>{text}</p>
        <a href="/">Về trang chủ</a>
    </div>
}

export default PaySuccess;