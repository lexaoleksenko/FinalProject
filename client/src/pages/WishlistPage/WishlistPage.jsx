import { React, useState } from 'react';
import { Grid } from '@mui/material';

import style from './WishlistPage.module.scss';
import ListCard from '../../components/Smart/ListCard/ListCard';
import ListCardSkeleton from '../../components/Smart/ListCard/ListCardSkeleton';

function WishlistPage() {
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
      <div className={style.title}>
        <h2>Your Wishlist In MobiStore</h2>
        <p>
          We all have some desires, this is your wish list in MobiStore. What is
          it for? You can share your wish list with others, for example in the
          form of a clue what you want for your birthday. Or note what you
          liked, so as not to fill your head with unnecessary trifles. And if
          you know what you need this product later, save it here so you do not
          have to look it up later.
        </p>
      </div>
      <Grid container spacing={4} marginTop={0} marginBottom={5}>
        {Array.from({ length: 9 }).map((_, index) => (
          <ListCard key={index} />
        ))}
      </Grid>
    </>
  );
}

export default WishlistPage;
