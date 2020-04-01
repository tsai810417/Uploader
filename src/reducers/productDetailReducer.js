import {
  RECEIVE_PEODUCT_DETAIL
} from '../actions/productDetailActions';

const _nullProductDetail = {
  name: null,
  picture_url: null,
  pc: {
    note: null,
    steps: null
  },
  android: {
    note: null,
    steps: null
  }
};

const productDetailReducer = (initState = _nullProductDetail, action) => {
  Object.freeze(initState);
  switch (action.type) {
    case RECEIVE_PEODUCT_DETAIL:
      return action.payload;

    default:
      return initState;
  }
};

export default productDetailReducer
