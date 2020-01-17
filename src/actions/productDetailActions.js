import * as APIUtil from '../util/productDetailUtil';
export const REQUEST_PRODUCT_DETAIL = 'REQUEST_PRODUCT_DETAIL';
export const RECEIVE_PEODUCT_DETAIL = 'RECEIVE_PEODUCT_DETAIL';

export const requestProductDetail = id => dispatch => {
  const productDetail = APIUtil.requestProductDetail(id);
  dispatch(receiveProductDetail(productDetail));
};

export const receiveProductDetail = productDetail => {
  return {
    type: RECEIVE_PEODUCT_DETAIL,
    payload: productDetail
  }
};
