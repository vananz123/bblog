
import Headerv2 from "../components/Headerv2";
function AdminLayout({children}) {
    return <div>
        <Headerv2/>
        <div className="container-fluid">
                {children}
        </div>
    </div>;
}

export default AdminLayout;