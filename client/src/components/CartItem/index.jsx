import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography } from '@mui/material';

import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 20px;
  padding-bottom: 20px;
  div {
    flex: 1;
  }
  .information,
  .buttons {
    display: flex;
    justify-content: space-evenly;
  }
  .buttons {
    border-bottom: 1px solid lightblue;
    padding-bottom: 20px;
  }
  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;

const itemPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
});

const itemsPropType = PropTypes.arrayOf(itemPropType);

function ItemsTable({ items, remove, increase, decrease }) {
  return (
    <Wrapper>
      {items?.map(item => (
        <>
          <Box className="information" key={item.id}>
            <Typography>Price: ${item.price}</Typography>
            <Typography>Total: ${item.price * item.count}</Typography>
            <Typography>Delete</Typography>
          </Box>
          <Box className="buttons">
            <Button
              size="small"
              sx={{ backgroundColor: '#A9A9A9' }}
              onClick={() => decrease(item.id, item.count)}
            >
              -
            </Button>
            <p>{item.count}</p>
            <Button
              size="small"
              sx={{ backgroundColor: '#A9A9A9' }}
              onClick={() => increase(item.id)}
            >
              +
            </Button>
            <Button
              size="small"
              sx={{ backgroundColor: '#A9A9A9' }}
              onClick={() => remove(item.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </>
      ))}
    </Wrapper>
  );
}

ItemsTable.defaultProps = {
  items: [],
};

ItemsTable.propTypes = {
  items: itemsPropType,
  remove: PropTypes.func.isRequired,
  increase: PropTypes.func.isRequired,
  decrease: PropTypes.func.isRequired,
};

export default ItemsTable;
