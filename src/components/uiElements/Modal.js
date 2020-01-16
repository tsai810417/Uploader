import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const styles = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  root: {
    background: '#FFFFFF'
  },
  paper: {
    position: 'absolute',
    width: 450,
  },
};

export default withStyles(styles)(Modal);
