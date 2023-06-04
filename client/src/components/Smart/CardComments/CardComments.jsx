/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  List,
  ListItem,
  Typography,
  Avatar,
  Rating,
  Modal,
  Skeleton,
  Drawer,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isAuthenticated } from '../../../helpers/authentication/authentication';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

import {
  clearComments,
  commentsProductState,
  fetchProductComments,
} from '../../../redux/slices/commenting';
import CommentsForm from '../CommentsForm/CommentsForm';
import CommentsCardItem from '../CommentsCardItem/CommentsCardItem';

const CommentsWrapper = styled(Box)`
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
`;

const TitleWrapper = styled(Box)`
  width: 100%;
  display: flex;
`;

const CommentsList = styled(List)``;

const CommentsItem = styled(ListItem)`
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 20px;
`;

const ModalForm = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CommentsDrawer = styled(Drawer)``;

const DrawerCommentsListWrapp = styled(Box)`
  width: 100%;
  max-width: 1200px;
  margin: auto;
  margin-top: 40px;
`;

function CardComments({ prodId, full, skeleton }) {
  const dispatch = useDispatch();
  const isAuth = isAuthenticated();
  const { productComments, newComment, status } =
    useSelector(commentsProductState);
  const [commentsArray, setCommentsArray] = useState(null);

  useEffect(() => {
    dispatch(clearComments);
    if (prodId) {
      dispatch(fetchProductComments(prodId));
    }
  }, []);

  useEffect(() => {
    if (prodId) {
      dispatch(fetchProductComments(prodId));
    }
  }, [newComment]);

  useEffect(() => {
    if (productComments) {
      setCommentsArray(productComments);
    }
  }, [productComments]);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleToggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const handleToggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  if (status === 'loading' || skeleton) {
    return (
      <CommentsWrapper>
        <TitleWrapper>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontSize: '25px',
              fontWeight: '600',
              margin: isAuth ? '' : 'auto',
            }}
          >
            Reviews
          </Typography>
          <ButtonDark
            label="Add New+"
            style={{
              display: isAuth ? '' : 'none',
              fontSize: '13px',
              padding: '2px',
              minWidth: '90px',
              marginLeft: 'auto',
            }}
            onClick={handleToggleModal}
          />
        </TitleWrapper>
        <CommentsList>
          {Array.from({ length: 4 }, (_, index) => (
            <CommentsItem key={index}>
              <Skeleton
                width="60px"
                height="60px"
                style={{ marginBottom: 'auto', marginRight: '20px' }}
                variant="circular"
              />
              <Skeleton width="100%" height="124px" variant="rounded" />
            </CommentsItem>
          ))}
        </CommentsList>
      </CommentsWrapper>
    );
  }

  return (
    <CommentsWrapper>
      <TitleWrapper>
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontSize: '25px',
            fontWeight: '600',
            margin: isAuth ? '' : 'auto',
          }}
        >
          Reviews
        </Typography>
        <ButtonDark
          label="Add New+"
          style={{
            display: isAuth ? '' : 'none',
            fontSize: '13px',
            padding: '2px',
            minWidth: '90px',
            marginLeft: 'auto',
          }}
          onClick={handleToggleModal}
        />
      </TitleWrapper>
      <CommentsList>
        <CommentsCardItem commentsArray={commentsArray} />
      </CommentsList>
      <ButtonDark
        label="View All"
        style={{
          fontSize: '13px',
          padding: '2px',
          minWidth: '90px',
        }}
        onClick={handleToggleDrawer}
      />
      <ModalForm open={isOpenModal} onClose={handleToggleModal}>
        <Box>
          <CommentsForm toggleModal={handleToggleModal} prodId={prodId} />
        </Box>
      </ModalForm>
      <CommentsDrawer
        anchor="bottom"
        open={isOpenDrawer}
        PaperProps={{
          style: {
            width: '100%',
            height: '100%',
            overflowY: 'auto',
            backgroundColor: '#00000038',
          },
        }}
        onClose={handleToggleDrawer}
      >
        <DrawerCommentsListWrapp>
          <CommentsList>
            <CommentsCardItem commentsArray={commentsArray} full />
          </CommentsList>
        </DrawerCommentsListWrapp>
        <IconButton
          style={{
            position: 'absolute',
            right: '0px',
            color: '#ffffff',
            fontSize: '40px',
          }}
          onClick={handleToggleDrawer}
        >
          <Close fontSize="20px" />
        </IconButton>
      </CommentsDrawer>
    </CommentsWrapper>
  );
}

CardComments.defaultProps = {
  prodId: null,
  full: false,
  skeleton: false,
};

CardComments.propTypes = {
  prodId: PropTypes.string,
  full: PropTypes.bool,
  skeleton: PropTypes.bool,
};

export default CardComments;
