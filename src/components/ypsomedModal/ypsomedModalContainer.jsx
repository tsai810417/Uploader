import { connect } from 'react-redux';
import YpsomedModal from './ypsomedModal';

import {
  setYpsomedAccount,
  resetYpsomedAccount
} from '../../actions/ypsomedModalActions';

const mapStateToProps = state => ({
  ypsomedAccount: state.ypsomedAccount
});

const mapDispatchToProps = dispatch => ({
  setYpsomedAccount: email => dispatch(setYpsomedAccount(email)),
  resetYpsomedAccount: () => dispatch(resetYpsomedAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(YpsomedModal);
