import AppleIcon from '@material-ui/icons/Apple';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    fontSize: '40px',
    color: '#555555',
    margin: '5px'
  },
};

export default withStyles(styles)(AppleIcon);
