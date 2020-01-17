import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    color: '#17b9df'
  },
};

export default withStyles(styles)(CircularProgress);
