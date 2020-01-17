import * as APIUtil from '../util/productListUtil';
export const REQUEST_PRODUCT_LIST = 'REQUEST_PRODUCT_LIST';
export const RECEIVE_PRODUCT_LIST = 'RECEIVE_PRODUCT_LIST';

export const requestProductList = () => dispatch => {
  const productList = APIUtil.requestProductList();
  dispatch(receiveProductList(productList));
};

export const receiveProductList = productList => {
  return {
    type: RECEIVE_PRODUCT_LIST,
    payload: productList
  }
};
