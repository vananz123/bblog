import { ADD_USER,DEL_USER } from "../actions/constants";
const initialState ={
    user :{},
}
const userReducers =(state=initialState, action)=>{
    switch(action.type){
        case ADD_USER:
            return{
                user:action.payload 
            }
        case DEL_USER:
            return{
                user:{}
            }
        default:
            return state
    }
}
export default userReducers;