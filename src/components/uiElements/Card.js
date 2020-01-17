import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

const styles = {
  root: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px'
  }
};

export default withStyles(styles)(Card);
