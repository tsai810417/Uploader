import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: '#F78484',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    width: 'auto',
    fontWeight: '700',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: '#E66464',
      color: 'white',
      border: 0
    },
  },
};

export default withStyles(styles)(Button);
