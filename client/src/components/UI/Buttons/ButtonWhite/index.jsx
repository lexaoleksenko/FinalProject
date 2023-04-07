import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import styles from './ButtonWhite.module.scss';

function ButtonWhite({ label, onClick, color, variant, disabled, style }) {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabled}
      className={styles.buttonWhite}
      style={{ minWidth: 150, borderRadius: 2, ...style }}
    >
      {label}
    </Button>
  );
}

ButtonWhite.defaultProps = {
  label: 'My Button',
  color: 'buttonWhite',
  variant: 'contained',
  disabled: false,
  style: '',
};

ButtonWhite.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool,
  style: PropTypes.string,
};

export default ButtonWhite;
