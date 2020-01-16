import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = {
  root: {
    display:'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
    '&:hover': {
      cursor: 'pointer',
      background: '#f1f3f6'
    }
  }
};

function HoverEffectCard(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Card className={clsx(classes.root, className)} {...other}>
    {children || 'class names'}
    </Card>
  );
}

HoverEffectCard.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(HoverEffectCard);
