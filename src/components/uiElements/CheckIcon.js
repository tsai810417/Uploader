import CheckIcon from '@material-ui/icons/CheckCircleOutline';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    fontSize: '80px',
    margin: '20px',
    color: '#17b9df',
  },
};

export default withStyles(styles)(CheckIcon);
