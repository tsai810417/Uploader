import { connect } from 'react-redux';
import UserInfo from './userInfo';

import {
  requestUserInfo
} from '../../actions/userInfoActions';

const mapStateToProps = state => ({
  token: state.session.token,
  user: state.userInfo.user,
  loading: state.userInfo.loading
});

const mapDispatchToProps = dispatch => ({
  requestUserInfo: token => dispatch(requestUserInfo(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
