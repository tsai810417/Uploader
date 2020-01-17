import ExitToApp from '@material-ui/icons/ExitToApp';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    fontSize: '40px',
    color: '#FFFFFF',
    margin: 'auto'
  },
};

export default withStyles(styles)(ExitToApp);
