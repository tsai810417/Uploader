import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    width: '80px',
    height: '100vh',
    border: '0px'
  },
  paper: {
    width: '80px',
    background: '#17b9df'
  }
};

export default withStyles(styles)(Drawer);
