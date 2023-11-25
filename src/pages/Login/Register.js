import { Fragment, useState } from 'react';
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import './style.scss'
import * as loginServices from '../../api/loginServices'
const Register =()=> {
    const [userRegister, setUserRegister] = useState({});
    const handleUserRegisterChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserRegister(values => ({...values, [name]: value}))
    }
 const navigate =useNavigate()
    const handleSubmit =async (event) => {
        event.preventDefault();
        console.log(userRegister);
        const resulf = await loginServices.register(userRegister)
        if(resulf.message == "Succsecc register"){
            navigate('/login')
        }
    }
    return (
        <>
        <div className="container-fluid">
            <section >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{borderRadius:"1rem"}}>
                        <div className="card-body p-5 text-center">

                        <form className="form-floating" onSubmit={handleSubmit}>
                            <h3 className="mb-5">Đăng ký</h3>
                            <div className="form-floating mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="floatingInput" 
                                    required
                                    name='ho'
                                    value={userRegister.ho || ""} 
                                    onChange={handleUserRegisterChange} 
                                    placeholder=""/>
                                <label htmlFor="floatingInput">Họ</label>
                            </div>
                            <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="floatingInput" 
                                        required
                                        name='ten'
                                        value={userRegister.ten || ""} 
                                        onChange={handleUserRegisterChange} 
                                        placeholder=""/>
                                    <label htmlFor="floatingInput">Tên</label>
                            </div>
                            <div className="form-floating mb-3">
                                    <input 
                                        type="text" 
                                        class="form-control" 
                                        id="floatingInput2" 
                                        required
                                        name='sdt'
                                        value={userRegister.sdt || ""} 
                                        onChange={handleUserRegisterChange} 
                                        placeholder=""/>
                                    <label htmlFor="floatingInput2">Số điện thoại</label>
                            </div>
                            <div className="form-floating mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="floatingInput3" 
                                        name='email'
                                        value={userRegister.email || ""}
                                        onChange={handleUserRegisterChange}
                                        placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput3">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="floatingPassword" 
                                    name='password'
                                    required
                                    value={userRegister.password || ""} 
                                    onChange={handleUserRegisterChange} 
                                    placeholder="Password"/>
                                <label htmlFor="floatingPassword">Mật khẩu</label>
                            </div>
                            <button className="btn btn-primary btn-lg btn-block mt-3" type='submit'>Đăng ký</button>
                        </form>
                            <hr className="my-4"/>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </section>        
        </div>
        
        </>
    )
}
export default Register