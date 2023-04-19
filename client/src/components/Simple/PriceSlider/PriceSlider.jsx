import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

function valueLabelFormat(value) {
  const units = ['uah'];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1000 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1000;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

function calculateValue(value) {
  return 2 ** value;
}

export default function NonLinearSlider() {
  const [value, setValue] = React.useState(10);

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: 230 }}>
      <Typography id="non-linear-slider">
        {valueLabelFormat(calculateValue(value))}
      </Typography>
      <Slider
        value={value}
        min={5}
        step={1}
        max={16}
        scale={calculateValue}
        getAriaValueText={valueLabelFormat}
        valueLabelFormat={valueLabelFormat}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
    </Box>
  );
}
