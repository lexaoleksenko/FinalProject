import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Popper, Backdrop } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { fetchSearchProduct, searchState } from '../../../redux/slices/search';
import { stateSelectedProducts } from '../../../redux/slices/cartLocal';
import {
  fetchAddProductsCart,
  increaseTotalQuantity,
} from '../../../redux/slices/cartBackEnd';

import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';

function InputNav({ label }) {
  const dispatch = useDispatch();
  const [prodArr, setProdArr] = useState([]);
  const [searchStatusLocal, setSearchStatus] = useState(false);
  const { status, searchProducts } = useSelector(searchState);
  const selectedProducts = useSelector(stateSelectedProducts);

  const [anchorEl, setAnchorEl] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleFetchSearch = debounce(event => {
    const { value } = event.target;
    setInputValue(value);

    if (value) {
      const data = {
        query: value,
      };
      dispatch(fetchSearchProduct(data));
    }

    setSearchStatus(value === '');
  }, 1500);

  const handleInputClick = event => {
    if (!searchStatusLocal && inputValue === '') {
      setAnchorEl(event.currentTarget);
      setSearchStatus(true);
    }
  };

  const handlePopperClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(searchProducts);
    }
  }, [status]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Auth addCartBack

  const handleIncreaseCountBack = prodId => {
    dispatch(fetchAddProductsCart({ productId: prodId }));
    dispatch(increaseTotalQuantity());
  };

  const rootStyle = {
    margin: 'auto 10px auto auto',
  };

  const formStyle = {
    margin: 'auto 10px auto auto',
  };

  const groupStyle = {
    position: 'relative',
  };

  const inputStyle = {
    fontSize: '16px',
    padding: '0 0 0 5px',
    display: 'block',
    width: '150px',
    color: '#ffffff',
    fontFamily: 'montserrat',
    border: 'none',
    borderBottom: '1px solid #ccc',
    backgroundColor: '#00000000',
  };

  const labelStyle = {
    color: '#ffffff',
    fontSize: '14px',
    position: 'absolute',
    pointerEvents: 'none',
    fontFamily: 'montserrat',
    textTransform: 'uppercase',
    fontWeight: '500',
    left: '90px',
    top: '-5px',
    transform:
      searchStatusLocal || inputValue !== '' ? 'translateY(-20px)' : 'none',
    transition: 'transform 0.3s ease',
  };

  const barStyle = {
    position: 'absolute',
    left: '0px',
    bottom: '0px',
    backgroundColor: '#5264AE',
    height: '1px',
    width: '150px',
    transition: '0.5s ease all',
  };

  const popperStyle = {
    position: 'absolute',
    zIndex: '999',
    width: '450px',
    maxHeight: ' 600px',
    overflowY: 'scroll',
    backgroundColor: '#ffffff',
    borderRadius: '4px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    padding: '10px',
    top: '40px',
    left: 'auto',
    right: '0',
  };

  const wrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  };

  const errorMessageStyle = {
    color: '#333333',
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const iconStyle = {
    marginTop: '10px',
    color: '#888888',
    fontSize: '48px',
  };

  const backdropStyle = {
    zIndex: '1',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    marginTop: '150px',
    marginBottom: '0px',
  };

  return (
    <div style={rootStyle}>
      <form
        style={formStyle}
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div style={groupStyle}>
          <input
            style={inputStyle}
            id="search"
            type="text"
            required
            onFocus={handleInputClick}
            onChange={event => handleFetchSearch(event)}
          />
          <span style={barStyle} />
          <label style={labelStyle}>
            {searchStatusLocal ? 'Search' : label}
          </label>
        </div>
      </form>
      <Popper
        style={popperStyle}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        {status === 'loaded' && prodArr.length === 0 && inputValue !== '' && (
          <div style={wrapperStyle}>
            <p style={errorMessageStyle}>Ooops...</p>
            <p style={errorMessageStyle}>Product not found</p>
            <SentimentVeryDissatisfiedIcon style={iconStyle} fontSize="large" />
          </div>
        )}

        {inputValue === '' && (
          <div style={wrapperStyle}>
            <p style={errorMessageStyle}>Enter the desired good</p>
          </div>
        )}

        {inputValue !== '' && prodArr.length > 0 && (
          <ShoppingCartItem
            items={prodArr}
            searchSettings="false"
            sx={{ fontSize: 15 }}
            addItemBack={handleIncreaseCountBack}
            popperClose={handlePopperClose}
          />
        )}
      </Popper>
      {open && (
        <Backdrop
          open={open}
          onClick={handlePopperClose}
          style={backdropStyle}
        />
      )}
    </div>
  );
}

InputNav.defaultProps = {
  label: 'Search',
};

InputNav.propTypes = {
  label: PropTypes.string,
};

export default InputNav;
