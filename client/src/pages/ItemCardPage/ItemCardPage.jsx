import { React, useState } from 'react';

import MainCard from '../../components/Simple/MainCard/MainCard';
import MainCardSkeleton from '../../components/Simple/MainCard/MainCardSkeleton';
import CardHelpInfo from '../../components/UI/CardHelpInfo/CardHelpInfo';

import style from './ItemCardPage.module.scss';

function ItemCardPage() {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <div className={style.mainCardContainer}>
        <MainCardSkeleton />
        <CardHelpInfo />
      </div>
    );
  }

  return (
    <div className={style.mainCardContainer}>
      <MainCard />
      <CardHelpInfo />
    </div>
  );
}

export default ItemCardPage;
