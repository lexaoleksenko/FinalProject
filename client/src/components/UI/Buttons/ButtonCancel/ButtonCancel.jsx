import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';

import styles from './ButtonCancel.module.scss';

function ButtonCancel({ onClick, style }) {
  return (
    <Button
      variant="text"
      color="buttonCancel"
      onClick={onClick}
      disabled={false}
      className={styles.buttonCancel}
      style={{
        minWidth: 30,
        borderRadius: 2,
        ...style,
      }}
    >
      <CloseIcon />
    </Button>
  );
}

ButtonCancel.defaultProps = {
  style: '',
};

ButtonCancel.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.string,
};

export default ButtonCancel;
