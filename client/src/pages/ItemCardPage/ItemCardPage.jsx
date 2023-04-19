import { React, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { cardProductState } from '../../redux/slices/getCardProduct';

import MainCard from '../../components/Smart/MainCard/MainCard';
import MainCardSkeleton from '../../components/Smart/MainCard/MainCardSkeleton';
import CardHelpInfo from '../../components/UI/CardHelpInfo/CardHelpInfo';

import style from './ItemCardPage.module.scss';

function ItemCardPage() {
  const [currentProd, setCurrentProd] = useState();

  const { status, product } = useSelector(cardProductState);
  console.log('STATUS>>>>>', status);

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
