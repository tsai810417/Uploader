import { connect } from 'react-redux';
import ProductDetail from './productDetail';

import {
  requestProductDetail
} from '../../actions/productDetailActions';

import {
  uploadRecords,
  updateUploadStatus,
  requestLastRecord
} from '../../actions/uploaderActions';

const mapStateToProps = state => ({
  token: state.session.token,
  detail: state.productDetail,
  uploadStatus: state.uploader.status
});

const mapDispatchToProps = dispatch => ({
  requestProductDetail: id => dispatch(requestProductDetail(id)),
  uploadRecords: (token, records, productId) => dispatch(uploadRecords(token, records, productId)),
  updateUploadStatus: status => dispatch(updateUploadStatus(status)),
  requestLastRecord: (token, productId) => dispatch(requestLastRecord(token, productId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
