import { useEffect, useRef, useState } from 'react';
import jwtDecode from 'jwt-decode';
import './style.scss'
import * as loginServices from '../../api/loginServices'
import { connect } from "react-redux";
import { addUserAPI } from '~/redux/actions/action';
import { Link, useNavigate } from 'react-router-dom';
const Login =(props)=> {
    const [sdt , setSdt] =useState(); //obj
    const [user,setUser] =useState({})
    const Navigate = useNavigate()
    const handleUserChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUser(values => ({...values, [name]: value}))
    }
    const Login= async(event)=>{
        event.preventDefault();
        const resulf = await loginServices.login(user)
        if(resulf.succsess ==true){
            window.localStorage.setItem("accsessToken",resulf.data)
            const decode = jwtDecode(resulf.data)
            props.addUserAPI(resulf.data)
            if(decode.role =="AD"){
                Navigate('/admin')
            }else{
                Navigate('/')
            }
        }else{
            alert(resulf.message)
        }
    }
    return (
        <div className="container-fluid">
            <section >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius:"1rem"}}>
                        <div className="card-body p-5 text-center">

                        <form className="form-floating" onSubmit={Login}>
                            <h3 className="mb-5">Sign in</h3>
                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    required
                                    name='sdt'
                                    value={user.sdt || ""} 
                                    onChange={handleUserChange} 
                                    placeholder=""/>
                                <label htmlFor="floatingInput">Số điện thoại</label>
                            </div>
                            <div className="form-floating">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="floatingPassword" 
                                    name='password'
                                    required
                                    value={user.password || ""} 
                                    onChange={handleUserChange} 
                                    placeholder="Password"/>
                                <label htmlFor="floatingPassword">Mật khẩu</label>
                            </div>
                            <button className="btn btn-primary btn-lg btn-block mt-3" type='submit'>Đăng nhập</button>
                        </form>
                            <hr className="my-4"/>
                            <Link to={'/register'}>Đăng ký tài khoản</Link>
                            <Link className='mx-3'>Quên mật khẩu</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>        
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser.user,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addUserAPI: (token) => dispatch(addUserAPI(token)),
    };
};
export default connect (mapStateToProps,mapDispatchToProps) (Login)