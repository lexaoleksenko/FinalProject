import { React, useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';

import { Container } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import {
  cardProductState,
  fetchCardProduct,
} from '../../redux/slices/cardProduct';

import MainCard from '../../components/Smart/MainCard/MainCard';
import MainCardSkeleton from '../../components/Smart/MainCard/MainCardSkeleton';
import CardHelpInfo from '../../components/UI/CardHelpInfo/CardHelpInfo';
import BrowsingHistory from '../../components/Smart/BrowsingHistory/BrowsingHistory';

import style from './ItemCardPage.module.scss';
import CardComments from '../../components/Smart/CardComments/CardComments';

function ItemCardPage() {
  const dispatch = useDispatch();
  const [currentProd, setCurrentProd] = useState();
  const { status, product } = useSelector(cardProductState);
  const match = useMatch('/products/:itemNo');
  const { itemNo } = match.params;

  useEffect(() => {
    setCurrentProd(null);
  }, []);

  useEffect(() => {
    dispatch(fetchCardProduct(itemNo));
  }, [itemNo]);

  useEffect(() => {
    if (status === 'loaded') {
      setCurrentProd(product);
    }
  }, [status, product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (status === 'loading') {
    return (
      <Container maxWidth="lg">
        <div className={style.mainCardContainer}>
          <MainCardSkeleton />
          <CardComments skeleton />
          <CardHelpInfo />
          <BrowsingHistory />
        </div>
      </Container>
    );
  }

  if (currentProd === product && status === 'loaded') {
    return (
      <Container maxWidth="lg">
        {' '}
        <div className={style.mainCardContainer}>
          <MainCard
            product={currentProd}
            name={currentProd.name}
            currentPrice={currentProd.currentPrice}
            description={currentProd.description}
            color={currentProd.color}
            imageUrls={currentProd.imageUrls}
          />
          <CardComments prodId={currentProd._id} />
          <CardHelpInfo />
          <BrowsingHistory />
        </div>
      </Container>
    );
  }
}

export default ItemCardPage;
