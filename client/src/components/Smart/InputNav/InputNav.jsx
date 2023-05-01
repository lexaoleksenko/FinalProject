import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { fetchSearchProduct } from '../../../redux/slices/search';

import styles from './InputNav.module.scss';

function InputNav({ label }) {
  const dispatch = useDispatch();

  const [querySearch, setQuerySearch] = useState();
  const [searchStatus, setSearchStatus] = useState(false);
  const handleSearch = event => {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    setQuerySearch(inputValue);
  };
  const handleFetchSearch = () => {
    console.log('status');
    if (querySearch) {
      const data = {
        query: querySearch,
      };
      dispatch(fetchSearchProduct(data));
      setSearchStatus(false);
      console.log('+');
    }
    if (querySearch === false) {
      setSearchStatus(true);
      console.log('-');
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.group}>
        <input
          className={styles.input}
          id="search"
          type="text"
          required
          onChange={event => handleSearch(event)}
        />
        <span className={styles.bar}>{}</span>
        <label className={styles.label}>
          {searchStatus ? 'Input goods' : label}
        </label>
        <Button variant="contained" type="button" onClick={handleFetchSearch}>
          Search
        </Button>
      </div>
    </form>
  );
}

InputNav.defaultProps = {
  label: 'Search',
};

InputNav.propTypes = {
  label: PropTypes.string,
};
export default InputNav;
