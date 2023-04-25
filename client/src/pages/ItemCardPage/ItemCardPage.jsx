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

function ItemCardPage(handleAddToCart) {
  const dispatch = useDispatch();
  const [currentProd, setCurrentProd] = useState();
  const { status, product } = useSelector(cardProductState);
  const match = useMatch('/product/:itemNo');
  const { itemNo } = match.params;
  useEffect(() => {
    dispatch(fetchCardProduct(itemNo));
  }, []);

  useEffect(() => {
    if (status === 'loaded') {
      setCurrentProd(product[0]);
      console.log('status === loaded product>>>>', product);
      console.log('status === loaded currentProd>>>>', currentProd);
    }
  }, [status, product]);

  if (status === 'loading') {
    return (
      <div className={style.mainCardContainer}>
        <MainCardSkeleton />
        <CardHelpInfo />
      </div>
    );
  }
  if (currentProd && status === 'loaded') {
    return (
      <div className={style.mainCardContainer}>
        <MainCard
          onClick={handleAddToCart}
          name={currentProd.name}
          currentPrice={currentProd.currentPrice}
          description={currentProd.description}
          color={currentProd.color}
          imageUrls={currentProd.imageUrls}
        />
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
