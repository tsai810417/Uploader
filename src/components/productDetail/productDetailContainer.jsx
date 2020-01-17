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
  uploadStatus: state.uploader.status,
  lastRecordTimestamp: state.uploader.lastRecordTimestamp
});

const mapDispatchToProps = dispatch => ({
  requestProductDetail: id => dispatch(requestProductDetail(id)),
  uploadRecords: (
    token,
    records,
    productId,
    lastRecordTimestamp
  ) => dispatch(uploadRecords(token, records, productId, lastRecordTimestamp)),
  updateUploadStatus: status => dispatch(updateUploadStatus(status)),
  requestLastRecord: (token, productId) => dispatch(requestLastRecord(token, productId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetail);
