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
const dataButton =[
    {name:"Tài khoản", icon:faUser ,
        link:[
            {slug:"user-add-new",content:"Thêm mới"},
            {slug:"user-list",content:"Danh sách"}
        ]},
    {name:"Danh mục", icon:faUser,
        link:[
            {slug:"category-add-new" ,content:"Thêm mới"},
            {slug:"category-list",content:"Danh sách"},
            {slug:"category-update"}
        ]},
    {name:"Sản phẩm", icon:faUser,
        link:[
            {slug:"product-add-new",content:"Thêm mới"},
            {slug:"product-list",content:"Danh sách"},
            {slug:"product-update"}
        ]},
    {name:"Khuyến mãi", icon:faUser,
        link:[
            {slug:"promotion-add-new",content:"Thêm mới"},
            {slug:"promotion-list",content:"Danh sách"}
        ]},
    {name:"Đánh giá", icon:faUser,
        link:[
            {slug:"judge-feedback",content:"Phản hồi"},
            {slug:"judge-list",content:"Danh sách"}
        ]},
    {name:"Đơn hàng", icon:faBasketShopping, dropdown: true,
        link:[
            {slug:"order-confrim",content:"Xác nhận"},
            {slug:"order-list",content:"Danh sách"}
        ]}
]
export  {dataButton};