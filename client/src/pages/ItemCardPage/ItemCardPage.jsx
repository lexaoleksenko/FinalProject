import { React, useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  cardProductState,
  fetchCardProduct,
} from '../../redux/slices/getCardProduct';
import MainCard from '../../components/Smart/MainCard/MainCard';
import MainCardSkeleton from '../../components/Smart/MainCard/MainCardSkeleton';
import CardHelpInfo from '../../components/UI/CardHelpInfo/CardHelpInfo';
import style from './ItemCardPage.module.scss';

function ItemCardPage() {
  const dispatch = useDispatch();
  const { status, product } = useSelector(cardProductState);
  const match = useMatch('/product/:itemNo');

  useEffect(async () => {
    dispatch(fetchCardProduct(match.params.itemNo));
  }, []);

  if (status === 'error') {
    // TODO: error view
    return null;
  }

  if (status === 'loading') {
    return (
      <div className={style.mainCardContainer}>
        <MainCardSkeleton />
        <CardHelpInfo />
      </div>
    );
  }

  if (status === 'loaded') {
    return (
      <div className={style.mainCardContainer}>
        <MainCard product={product} />
        <CardHelpInfo />
      </div>
    );
  }
}

export default ItemCardPage;

MainCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  handleAddToCart: PropTypes.func.isRequired,
  name: PropTypes.string,
  currentPrice: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};
