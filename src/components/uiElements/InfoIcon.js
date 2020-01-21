import ErrorOutline from '@material-ui/icons/ErrorOutline';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    color: '#1890ff',
    margin: '12px 12px 0px 0px',
    fontSize: '35px'
  },
};

export default withStyles(styles)(ErrorOutline);
