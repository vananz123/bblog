import { Fragment, useEffect, useState } from "react";
import { OrderList } from "./OrderFeature";
import { ProductForm,ProductList,ProductFormUpdate } from "./ProducFeature";
import {CategoryForm,CategoryList} from "./CategoryFeature";
import { PromotionList ,PromotionForm } from "./PromotionFeature";
import { JudgeList } from "./JudgeFeature";
import { Route } from "react-router-dom";
function Feature({slug}) {
    const [data, setData]= useState()
    useEffect(()=>{
        setData(slug)
    },[slug])
    return <div>
        {data =='product-add-new' ? <ProductForm/> : <Fragment/>}
        {data =='product-list' ? <ProductList/> : <Fragment/>}
        {data =='product-update' ? <ProductFormUpdate/> : <Fragment/>}
        {data =='category-add-new'? <CategoryForm/>: <Fragment/>}
        {data =='category-list'? <CategoryList/>:<Fragment/>}
        {data =='category-update'? <CategoryForm slug={slug}/> : <Fragment/>}
        {data =='order-list' ? <OrderList/>: <Fragment/>}
        {data =='order-confrim' ? <OrderList slug={slug}/>:<Fragment/>}
        {data =='promotion-add-new' ? <PromotionForm/>: ''}
        {data =='promotion-list' ? <PromotionList/> : ''}
        {data =='promotion-update'? <PromotionForm slug={slug}/>:''}
        {data =='judge-list' ? <JudgeList/> : ''}
    </div>;
}

export default Feature;