import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    fontSize: '40px',
    color: '#FFFFFF',
    margin: '20px',
    background: '#17b9df',
    '&:hover': {
      cursor: 'pointer'
    }
  },
};

export default withStyles(styles)(ArrowBackIcon);
