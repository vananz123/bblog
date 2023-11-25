import { useEffect, useState } from "react";
function usePromotionPrecent(giaBan,giaBanKm,hieuLuc) {
    const [price,setPrice] =useState(null)
    useEffect(()=>{
        if(hieuLuc != null){
            if (hieuLuc == true || giaBanKm != 0) {
                var t = (giaBanKm * 100) / giaBan;
                setPrice( Math.round(100 - t));
            } 
        }
        return
    })
    return price
}

export default usePromotionPrecent;