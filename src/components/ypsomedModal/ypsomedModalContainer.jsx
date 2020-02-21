import { connect } from 'react-redux';
import YpsomedModal from './ypsomedModal';

import {
  clearYpsomedError,
  requestYpsomedAccount,
  linkYpsomedAccount,
  unlinkYpsomedAccount
} from '../../actions/ypsomedModalActions';

const mapStateToProps = state => ({
  token: state.session.token,
  loading: state.ypsomedAccount.loading,
  country: state.ypsomedAccount.country,
  email: state.ypsomedAccount.email,
  lastSync: state.ypsomedAccount.lastSync,
  errors: state.ypsomedError
});

const mapDispatchToProps = dispatch => ({
  clearYpsomedError: () => dispatch(clearYpsomedError()),
  requestYpsomedAccount: token => dispatch(requestYpsomedAccount(token)),
  linkYpsomedAccount: accountInfo => dispatch(linkYpsomedAccount(accountInfo)),
  unlinkYpsomedAccount: accountInfo => dispatch(unlinkYpsomedAccount(accountInfo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YpsomedModal);
