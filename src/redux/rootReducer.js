import { combineReducers } from "redux";
import {cartReducers,userReducers} from './reducers'

const rootReducer = combineReducers({
  cart: cartReducers,
  currentUser: userReducers
});

export default rootReducer;
