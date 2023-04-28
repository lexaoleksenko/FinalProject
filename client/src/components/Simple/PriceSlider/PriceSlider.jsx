import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

import { useDispatch } from 'react-redux';
import { setMinPrice, setMaxPrice } from '../../../redux/slices/getAllProducts';

export default function NonLinearSlider() {
  const dispatch = useDispatch();
  const [rangeValues, setRangeValues] = React.useState([600, 2000]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setMinPrice(rangeValues[0]));
      dispatch(setMaxPrice(rangeValues[1]));
    }, 500);

    return () => clearTimeout(timer);
  }, [rangeValues]);

  const handleChange = (event, newValue) => {
    setRangeValues(newValue);
  };

  return (
    <Box sx={{ width: 230 }}>
      <Typography id="slider">{`${rangeValues[0]}USD - ${rangeValues[1]}USD`}</Typography>
      <Slider
        value={rangeValues}
        onChange={handleChange}
        valueLabelDisplay="auto"
        marks={false}
        min={600}
        step={200}
        max={2000}
        aria-labelledby="slider"
      />
    </Box>
  );
}
