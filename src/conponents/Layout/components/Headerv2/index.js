import { Routes, Route, Link, NavLink, Form } from "react-router-dom";
import { Fragment, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faPhone,faHeadset,
  faAddressCard,
  faCartShopping,
  faUser,
  faBars,
  faX,
  faHouse,
  faBasketShopping
} from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux';
import { ButtonNav } from "./ButtonNav";
import { dataButton as DataButtonLink } from "~/conponents/Feature/DataButtonLink";
import Account from "../Account";
import clsx from "clsx";
import styles from './style.module.scss'
const Headerv2 =(props)=> {
    const [currentUser, setCurrentUser] =useState(null)
    useEffect(()=>{
        if (Object.keys(props.currentUser) === 0) {
            setCurrentUser(null);
        } else {
            setCurrentUser(props.currentUser.data);
        }
    })
    const dataButton =DataButtonLink
    return (
    <>
    <div className={clsx(styles.header)} style={{backgroundColor:" #e3f2fd"}}>
            <div className="container-fluid ">
                <nav  className='navbar'>
                        <div className='logo' style={{width:"3rem",height:"3rem"}}>
                            <Link to={'/admin'} >
                                <img className="w-100 h-100" src={process.env.PUBLIC_URL + 'access/img/logo.png'}/>
                            </Link>
                        </div>
                      
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <Link to='/admin' className="nav-link">
                                    <FontAwesomeIcon icon={faHouse} style={{color: "#0065ee",paddingRight:"5px"}}/>
                                    Dashboard
                                </Link>
                            </li>
                            {dataButton.map((e,index)=>(
                                
                                <ButtonNav key={index} data={e}/>
                            ))}
                        </ul>
                        {<Account currentUser={currentUser}/>}
                </nav >
            </div>
        </div>
        </>
    )

}
const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps)(Headerv2)