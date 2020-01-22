import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import sessionErrorReducer from './sessionErrorReducer';
import userInfoReducer from './userInfoReducer';
import productListReducer from './productListReducer';
import productDetailReducer from './productDetailReducer';
import uploaderReducer from './uploaderReducer';
import ypsomedModalReducer from './ypsomedModalReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  sessionError: sessionErrorReducer,
  userInfo: userInfoReducer,
  productList: productListReducer,
  productDetail: productDetailReducer,
  uploader: uploaderReducer,
  ypsomedAccount: ypsomedModalReducer
});

export default rootReducer;
