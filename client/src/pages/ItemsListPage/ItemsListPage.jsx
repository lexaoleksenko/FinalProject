import { React, useState } from 'react';
import { Grid } from '@mui/material';

import style from './ItemsList.module.scss';
import ListCard from '../../components/Simple/ListCard/ListCard';
import CardSlider from '../../components/Smart/CardSlider/CardSlider';
import ListCardSkeleton from '../../components/Simple/ListCard/ListCardSkeleton';

function ItemsListPage() {
  const [isLoading] = useState(false);

  if (isLoading) {
    return (
      <Grid container spacing={4} marginTop={0} marginBottom={2}>
        {Array.from({ length: 9 }).map((_, index) => (
          <ListCardSkeleton key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <>
      <CardSlider />
      <h2 className={style.title}>
        All categories
        <span>{'>'}Apple</span>
        <span>{'>'}128GB</span>
        <span>{'>'}Black</span>
      </h2>
      <Grid container spacing={4} marginTop={0} marginBottom={2}>
        {Array.from({ length: 9 }).map((_, index) => (
          <ListCard key={index} />
        ))}
      </Grid>
    </>
  );
}

export default ItemsListPage;
