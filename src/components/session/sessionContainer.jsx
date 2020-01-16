import { connect } from 'react-redux';
import SessionForm from './sessionForm';

import {
  requestLoginCode,
  loginWithCode,
  clearSessionError
} from '../../actions/sessionActions';

const mapStateToProps = state => ({
  email: state.session.email,
  userId: state.session.userId,
  loading: state.session.loading,
  errors: state.sessionError
});

const mapDispatchToProps = dispatch => ({
  requestLoginCode: email => dispatch(requestLoginCode(email)),
  loginWithCode: (payload, history) => dispatch(loginWithCode(payload, history)),
  clearSessionError: () => dispatch(clearSessionError())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
