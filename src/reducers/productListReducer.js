import {
  RECEIVE_PRODUCT_LIST
} from '../actions/productListActions';

const _nullProductList = [];

const productListReducer = (initState = _nullProductList, action) => {
  Object.freeze(initState);
  switch (action.type) {
    case RECEIVE_PRODUCT_LIST:
      return action.payload;

    default:
      return initState;
  }
};

export default productListReducer;
