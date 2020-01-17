import { connect } from 'react-redux';
import Sidebar from './sidebar';

import {
  logout
} from '../../actions/sessionActions';

const mapStateToProps = state => ({
  isLoggedIn: Boolean(state.session.token)
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
