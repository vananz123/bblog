import { Routes, Route, Link, NavLink } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faPhone,
    faHeadset,
    faAddressCard,
    faCartShopping,
    faUser,
    faBars,
    faX,
} from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import * as categoryServices from '~/api/categoryServices';
import Search from '~/conponents/Search';
import { MenuItem as Menu } from '~/conponents/Popper/Menu';
import CategoryItem from '~/conponents/CategoryItem';
import Account from '../Account';
import './style.scss';
const Header = (props) => {
    const [isClickDM, setIsClickDM] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [catetoryItem, setCatetoryItem] = useState([]);
    useEffect(() => {
        if (Object.keys(props.currentUser) === 0) {
            setCurrentUser(null);
        } else {
            setCurrentUser(props.currentUser.data);
        }
    });
    useEffect(()=>{
        const apiCategory = async () => {
            const resulf = await categoryServices.categoryAll();
            setCatetoryItem(resulf);
        };
        apiCategory();
    },[])
    return (
        <>
            <div className="header">
                <div className="container-fluid">
                    <div className="navbar">
                        <div className="logo" style={{ width: '3rem', height: '3rem' }}>
                            <Link to={'/'}>
                                <img className="w-100 h-100" src={process.env.PUBLIC_URL + 'access/img/logo.png'} />
                            </Link>
                        </div>
                        <Search></Search>
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-light text-dark">
                                    <FontAwesomeIcon icon={faPhone} style={{ color: '#0065ee', paddingRight: '5px' }} />
                                    09090909
                                </button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-light text-dark">
                                    <FontAwesomeIcon
                                        icon={faHeadset}
                                        style={{ color: '#0065ee', paddingRight: '5px' }}
                                    />
                                    Khiếu nại
                                </button>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-light text-dark">
                                    <FontAwesomeIcon
                                        icon={faAddressCard}
                                        style={{ color: '#0065ee', paddingRight: '5px' }}
                                    />
                                    Về chúng tôi
                                </button>
                            </li>
                        </ul>
                        <div className="header-right d-flex justify-content-between">
                            {<Account currentUser={currentUser}/>}

                            <Link to={'/cart'} className="btn btn-outline-light text-dark mx-2 rounded-pill position-relative"
                                    style={{ height: '3rem',width:"3rem"}}>
                                <FontAwesomeIcon className="align-middle" icon={faCartShopping}/>
                                <span className="position-absolute translate-middle badge rounded-pill bg-danger p-1">
                                    {props.cart.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="danh-muc d-flex">
                        <Menu isClick={isClickDM}>
                            <button
                                type="button"
                                className="btn btn-outline-light text-dark"
                                style={{ width: '8rem', height: '4rem' }}
                                onClick={() => {
                                    setIsClickDM(!isClickDM);
                                }}
                            >
                                <span className="align-middle">
                                    {isClickDM ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
                                </span>
                                <span className="align-middle" style={{ marginLeft: '5px' }}>
                                    Danh mục
                                </span>
                            </button>
                        </Menu>
                        <div className="tt d-flex justify-content-left">
                            {catetoryItem.map((e) => (
                                <CategoryItem key={e.id} data={e} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        cart: state.cart.cartAr,
        currentUser: state.currentUser.user,
    };
};
export default connect(mapStateToProps)(Header);
