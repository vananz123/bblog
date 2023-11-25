import React, { useState } from "react";
import jwtDecode from "jwt-decode";
import { Outlet,Navigate } from "react-router-dom";
function PrivateRoute({component:component,...rest}) {
    const useAuth =()=>{
        try{
            const token = localStorage.getItem("accsessToken")
            const decode = jwtDecode(token)
            if(decode.role =="AD"){
                return true
            }else{
                return false
            }
        }catch{
            return false
        }
    }
    const auth = useAuth()
    return auth ? <Outlet/> : <Navigate to={'/login'}/>
}

export default PrivateRoute;