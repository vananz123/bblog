import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Fragment } from "react";
import Footer from "../components/Footer";
const DefaultLayout =({children})=>{
    return(
        <div>
            <Header/>
            <div className="container-fluid mt-2">
                {children}
            </div>
            <Footer/>
        </div>
    )
}
export default DefaultLayout;