import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Menu, Grid } from '@mui/material';
import { fetchSearchProduct, searchState } from '../../../redux/slices/search';

import styles from './InputNav.module.scss';
import ListCard from '../ListCard/ListCard';
import style from '../../../pages/ItemsListPage/ItemsList.module.scss';

function InputNav({ label }) {
  const dispatch = useDispatch();
  const [prodArr, setProdArr] = useState([]);

  const [querySearch, setQuerySearch] = useState();
  const [searchStatusLocal, setSearchStatusLocal] = useState(false);

  const [isDrawerStatus, setDrawerStatus] = useState(false);

  const { searchStatus, searchProducts } = useSelector(searchState);
  const handleSearch = event => {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    setQuerySearch(inputValue);
  };
  const handleFetchSearch = () => {
    if (querySearch) {
      const data = {
        query: querySearch,
      };
      dispatch(fetchSearchProduct(data));
      setSearchStatusLocal(false);
    }
    if (querySearch === false) {
      setSearchStatusLocal(true);
    }
  };

  const handleModalOpen = () => {
    setDrawerStatus(true);
  };
  const handleModalClose = () => {
    setDrawerStatus(true);
  };

  useEffect(() => {
    if (searchStatus === 'loaded') {
      setProdArr(searchProducts);
    }
  }, [searchStatus]);
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
        <Button
          variant="contained"
          type="button"
          onClick={handleFetchSearch}
          onFocus={handleModalOpen}
        >
          Search
        </Button>
      </div>
      {searchStatus && (
        <Menu
          open={isDrawerStatus}
          onClose={handleModalClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            style: {
              width: 300,
              backgroundColor: '#000000',
              border: '1px solid #ffffff',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <Container maxWidth="lg">
            {' '}
            <div className={style.root}>
              <Grid display="flex">
                {searchStatus === 'loading' ? (
                  <Grid container spacing={1} marginTop={0} marginBottom={5}>
                    <div>Товар не найден</div>
                  </Grid>
                ) : (
                  <Grid container spacing={1} marginTop={0} marginBottom={5}>
                    {prodArr.map((product, index) => (
                      <ListCard
                        product={product}
                        key={index}
                        imageUrl={product.imageUrls[0]}
                        name={product.name}
                        currentPrice={product.currentPrice}
                        itemNo={product.itemNo}
                      />
                    ))}
                  </Grid>
                )}
              </Grid>
            </div>
          </Container>
        </Menu>
      )}
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
