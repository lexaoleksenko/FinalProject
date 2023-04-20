import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import NonLinearSlider from '../NonLinearSlider/NonLinearSlider';
import PriceSlider from '../PriceSlider/PriceSlider';

import style from './ProductAccordion.module.scss';

function SimpleAccordion() {
  const [expanded, setExpanded] = React.useState(0);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Accordion className={style.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Goods</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <Accordion className={style.accordion}>
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
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        iPhone
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        Samsung
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        Huawei
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
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
                <Accordion
                  className={style.accordion}
                  expanded={expanded === 0}
                  onChange={handleChange(0)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Phone memory capacity</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <NonLinearSlider />
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  className={style.accordion}
                  expanded={expanded === 0}
                  onChange={handleChange(0)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Display</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={style.checkbox}>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        LCD
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        OLED
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        AMOLED
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        Retina
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
                    <Typography>Color</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className={style.checkbox}>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        Black
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
                        />
                        White
                      </span>
                      <span>
                        <Checkbox
                          inputProps={{ 'aria-label': 'Checkbox demo' }}
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
      </AccordionDetails>
    </Accordion>
  );
}

export default SimpleAccordion;
