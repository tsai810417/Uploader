import React from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles';

const spinnerStyles = {
  spinner: {
    marginLeft: 20,
    color: '#FFFFFF'
  }
};

const buttonStyles = {
  root: {
    background: '#17b9df',
    borderRadius: 5,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    width: 'auto',
    fontWeight: '700',
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: '#0982BA',
      color: 'white',
      border: 0
    },
  },
};

const SpinnerAdornment = withStyles(spinnerStyles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={30}
  />
));

const LoadingButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props
  return (
    <Button {...rest} disabled={loading}>
      {children}
      {loading && <SpinnerAdornment {...rest} />}
    </Button>
  )
};

export default withStyles(buttonStyles)(LoadingButton);
