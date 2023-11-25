import AdminLayout from '../conponents/Layout/AdminLayout'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import AdminFeature from '../pages/AdminFeature'
import { Login ,Register} from '../pages/Login'
import Profile from '../pages/Profile'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/Pay/PaySuccess'
import Cart from '../pages/Cart'
import ProductList from '../pages/ProductList'
import ProductDetail from '../pages/ProductDetail'
import NotFound from '../pages/NotFound'
import { Fragment } from 'react'
// ko đăng nhập
const publicRoutes =[
    {path :'/', component :Home},
    {path :'/login', component :Login , layout:Fragment},
    {path:'/register',component:Register,layout:Fragment},
    {path:'/404',component:NotFound,layout:Fragment},
    {path :'/profile',component:Profile},
    {path: '/pay-checkout',component:Pay},
    {path:'/pay-success',component:PaySuccess},
    {path: '/cart',component: Cart},
    {path:'/product/:id',component:ProductList},
    {path:'product/detail/:id',component:ProductDetail},
]
// phải đăng nhập
const privateRoutes =[
    {path :'/admin', component :Dashboard, layout:AdminLayout},
    {path:'/admin/feature/:slug',component:AdminFeature,layout:AdminLayout},
    {path:'/admin/feature/:slug/:id',component:AdminFeature,layout:AdminLayout}
]
export {publicRoutes, privateRoutes}