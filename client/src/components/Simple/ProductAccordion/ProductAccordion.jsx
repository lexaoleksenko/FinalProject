import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import NonLinearSlider from '../NonLinearSlider/NonLinearSlider';
import PriceSlider from '../PriceSlider/PriceSlider';

import {
  fetchAllProducts,
  allProdState,
} from '../../../redux/slices/getAllProducts';

import style from './ProductAccordion.module.scss';

function SimpleAccordion() {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(0);

  // Pagination
  const { selectPage } = useSelector(allProdState);

  // filter brand
  const [selectBrand, setSelectBrand] = useState([]);

  const delSelectBrand = value => {
    const newSelectBrand = selectBrand.filter(brand => brand !== value);
    setSelectBrand(newSelectBrand);
  };

  // filter color
  const [selectColor, setSelectColor] = useState([]);

  const delSelectColor = value => {
    const newSelectColor = selectColor.filter(color => color !== value);
    setSelectColor(newSelectColor);
  };

  // filter display
  const [selectDisplay, setSelectDisplay] = useState([]);

  const delSelectDisplay = value => {
    const newSelectDisplay = selectDisplay.filter(display => display !== value);
    setSelectDisplay(newSelectDisplay);
  };

  // filter price
  const { filterMinPrice, filterMaxPrice } = useSelector(allProdState);

  // create filter URL params
  const urlParams = new URLSearchParams();

  if (selectPage) {
    urlParams.set('startPage', selectPage);
  }

  if (selectBrand.length >= 1) {
    urlParams.set('brand', selectBrand);
  }

  if (selectColor.length >= 1) {
    urlParams.set('color', selectColor);
  }

  if (selectDisplay.length >= 1) {
    urlParams.set('display', selectDisplay);
  }

  if (filterMinPrice) {
    urlParams.set('minPrice', filterMinPrice);
  }

  if (filterMaxPrice) {
    urlParams.set('maxPrice', filterMaxPrice);
  }

  const url = urlParams.toString().replace(/%2C/g, ',');

  // dispatch filter URL
  useEffect(() => {
    dispatch(fetchAllProducts(url));
  }, [
    selectBrand,
    selectColor,
    filterMinPrice,
    filterMaxPrice,
    selectDisplay,
    selectPage,
  ]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div>
        <Accordion
          className={style.accordion}
          expanded={expanded === 0}
          onChange={handleChange(0)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Phones</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Accordion
                className={style.accordion}
                expanded={expanded === 0}
                onChange={handleChange(0)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Brand</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <Checkbox
                        name="Apple"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                      />
                      Apple
                    </span>
                    <span>
                      <Checkbox
                        name="Samsung"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                      />
                      Samsung
                    </span>
                    <span>
                      <Checkbox
                        name="Huawei"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                      />
                      Huawei
                    </span>
                    <span>
                      <Checkbox
                        name="Xiaomi"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                      />
                      Xiaomi
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                className={style.accordion}
                expanded={expanded === 0}
                onChange={handleChange(0)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PriceSlider />
                </AccordionDetails>
              </Accordion>
              <Accordion className={style.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Phone memory capacity</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <NonLinearSlider />
                </AccordionDetails>
              </Accordion>
              <Accordion className={style.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Display</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <Checkbox
                        name="LCD"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                      />
                      LCD
                    </span>
                    <span>
                      <Checkbox
                        name="OLED"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                      />
                      OLED
                    </span>
                    <span>
                      <Checkbox
                        name="AMOLED"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                      />
                      AMOLED
                    </span>
                    <span>
                      <Checkbox
                        name="Retina"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                      />
                      Retina
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className={style.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Color</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <Checkbox
                        name="black"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectColor([...selectColor, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectColor(e.target.name);
                          }
                        }}
                      />
                      Black
                    </span>
                    <span>
                      <Checkbox
                        name="white"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectColor([...selectColor, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectColor(e.target.name);
                          }
                        }}
                      />
                      White
                    </span>
                    <span>
                      <Checkbox
                        name="other"
                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectColor([...selectColor, e.target.name]);
                          }
                          if (!e.target.checked) {
                            delSelectColor(e.target.name);
                          }
                        }}
                      />
                      Other
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div>
        <Accordion className={style.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Accessories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={style.checkbox}>
              <span>
                <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
                Сovers
              </span>
              <span>
                <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
                Headphones
              </span>
              <span>
                <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
                Charger
              </span>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}

export default SimpleAccordion;
