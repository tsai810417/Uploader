import { connect } from 'react-redux';
import ProductList from './productList';

import { requestProductList } from '../../actions/productListActions';

const mapStateToProps = state => ({
  products: state.productList
});

const mapDispatchToProps = dispatch => ({
  requestProductList: () => dispatch(requestProductList())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)
