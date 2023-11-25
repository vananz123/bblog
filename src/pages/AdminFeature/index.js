
import { useParams } from "react-router-dom";
import Feature from "../../conponents/Feature";
function AdminFeature() {
    const {slug} =useParams()
    console.log(slug)
    return <div className="admin-feature">
        <Feature slug={slug}/>
    </div>;
}

export default AdminFeature;