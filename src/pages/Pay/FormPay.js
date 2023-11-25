import { useEffect ,useState} from "react";

function FormPay(props) {
    const [khachHang, setKhachHang] =useState(props.data)
    const handleKhachHangChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setKhachHang(values => ({...values, [name]: value}))
    }
    useEffect(()=>{
        //setKhachHang(props.data)
        props.handleSetKh(khachHang)
        
    })
    return ( 
        <form>
            <div className="row g-2 mb-3">
                <div className="col-md">
                    <div className="form-floating">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInputValue" 
                        name="ho"
                        value={khachHang.ho}
                        onChange={handleKhachHangChange}
                        placeholder="name@example.com"/>
                    <label htmlFor="floatingInputValue">Họ</label>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-floating">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        name="ten"
                        value={khachHang.ten}
                        onChange={handleKhachHangChange}
                        placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Tên</label>
                    </div>
                </div>
            </div>
            <div className="row g-2 mb-3">
                <div className="col-md">
                    <div className="form-floating ">
                    <input 
                        type="text" 
                        className="form-control" 
                        id="floatingInput" 
                        name="sdt"
                        value={khachHang.sdt}
                        onChange={handleKhachHangChange}
                        placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Số điện thoại</label>
                    </div>
                </div>
                <div className="col-md">
                    <div className="form-floating">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        name="email"
                        value={khachHang.email}
                        onChange={handleKhachHangChange}
                        placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email</label>
                    </div>
                </div>
            </div>
            <div className="form-floating mb-3">
            <input 
                type="text" 
                className="form-control" 
                id="floatingInput" 
                name="diaChi"
                value={khachHang.diaChi}
                onChange={handleKhachHangChange}
                placeholder="name@example.com"/>
            <label htmlFor="floatingInput">Địa chỉ</label>
            </div>
        </form>
     );
}

export default FormPay;