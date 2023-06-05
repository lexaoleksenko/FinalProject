import React, { useEffect, useState } from 'react';
import {
  Box,
  ListItem,
  Typography,
  Avatar,
  Rating,
  IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useDispatch } from 'react-redux';
import { toogleEditModal } from '../../../redux/slices/commenting';
import { isAuthenticated } from '../../../helpers/authentication/authentication';

const CommentsItem = styled(ListItem)`
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 20px;
`;

const CommentsContent = styled(Box)`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const AuthorNameRating = styled(Box)`
  width: 100%;
  text-align: center;
  display: flex;
  margin-bottom: 5px;
`;

const CommentsText = styled(Typography)`
  width: 100%;
  margin-left: 15px;
`;

function CommentsCardItem({ commentsArray, full }) {
  const dispatch = useDispatch();
  const [commentsState, setCommentsState] = useState(null);

  const isAuth = isAuthenticated();

  useEffect(() => {
    if (commentsArray) {
      const newArray = full ? [...commentsArray] : commentsArray.slice(-4);
      const reversedArray = newArray.reverse();
      setCommentsState(reversedArray);
    }
  }, [commentsArray]);

  const handleToggleModal = id => {
    dispatch(toogleEditModal(id));
  };

  return (
    <Box>
      {commentsState && commentsState.length > 0 ? (
        commentsState.map(comments => {
          const commentsObj = comments.content
            .split('`')
            .reduce((acc, entry) => {
              const [key, value] = entry.split(':');
              acc[key] = value;
              return acc;
            }, {});

          const itHaveParagraphs = Boolean(commentsObj.comment.includes('\n'));

          const formattedComment = itHaveParagraphs
            ? commentsObj.comment
                .split('\n')
                .map((line, index) => <p key={index}>{line}</p>)
            : commentsObj.comment;

          const firstLetter = comments.customer.firstName
            .charAt(0)
            .toUpperCase();

          const isCustomerComment = isAuth
            ? Boolean(
                String(
                  window.localStorage.getItem('customer').replace(/"/g, ''),
                ) === String(comments.customer._id),
              )
            : false;

          return (
            <CommentsItem key={comments._id}>
              <Avatar
                sx={{
                  width: '60px',
                  height: '60px',
                  marginBottom: 'auto',
                  marginRight: '10px',
                }}
              >
                {firstLetter}
              </Avatar>
              <CommentsContent>
                <AuthorNameRating>
                  <Typography
                    sx={{
                      textTransform: 'uppercase',
                      fontSize: '15px',
                      marginLeft: '10px',
                    }}
                  >
                    {comments.customer.firstName} {comments.customer.lastName}
                  </Typography>
                  <Rating
                    sx={{
                      marginRight: 'auto',
                      marginLeft: '10px',
                      fontSize: '20px',
                    }}
                    value={Number(commentsObj.rating)}
                    readOnly
                  />
                  {isCustomerComment && (
                    <IconButton
                      style={{
                        color: '#000000',
                        fontSize: '20px',
                      }}
                      onClick={() => {
                        handleToggleModal({
                          id: comments._id,
                          data: commentsObj,
                        });
                      }}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  )}
                </AuthorNameRating>
                <CommentsText variant="div">
                  <Typography fontSize="14px" marginLeft="15px">
                    <Typography
                      variant="span"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Advantages:{' '}
                    </Typography>
                    {commentsObj.advantages}
                  </Typography>
                  <Typography fontSize="14px" marginLeft="15px">
                    <Typography
                      variant="span"
                      textTransform="uppercase"
                      fontWeight="600"
                    >
                      Flaws:{' '}
                    </Typography>
                    {commentsObj.flaws}
                  </Typography>
                  <Typography marginLeft="15px" marginTop="10px">
                    {formattedComment}
                  </Typography>
                </CommentsText>
              </CommentsContent>
            </CommentsItem>
          );
        })
      ) : (
        <CommentsItem>
          <Typography
            style={{
              margin: 'auto',
              padding: '30px',
              textTransform: 'uppercase',
              fontWeight: '500',
            }}
          >
            The product has no reviews yet
          </Typography>
        </CommentsItem>
      )}
    </Box>
  );
}

/* eslint-disable react/forbid-prop-types */

CommentsCardItem.defaultProps = {
  full: false,
  commentsArray: null,
};

CommentsCardItem.propTypes = {
  full: PropTypes.bool,
  commentsArray: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      product: PropTypes.object.isRequired,
      content: PropTypes.string.isRequired,
      customer: PropTypes.object.isRequired,
      __v: PropTypes.number.isRequired,
    }),
  ),
};

export default CommentsCardItem;
