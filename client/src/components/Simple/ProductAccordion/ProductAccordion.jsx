import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import PriceSlider from "../PriceSlider/PriceSlider";

import {
  filterProdState, fetchFilterProducts, setMaxPrice, setMinPrice, setSelectPage
} from "../../../redux/slices/getFilterProducts";

import style from "./ProductAccordion.module.scss";

function SimpleAccordion() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(0);

  // Getting current search parameters
  const queryParams = location.search.substring(1);

  // Pagination
  const { selectPage } = useSelector(filterProdState);
  const setPageOne = () => {
    dispatch(setSelectPage(1));
  };

  // filter brand
  const [selectBrand, setSelectBrand] = useState([]);

  const delSelectBrand = value => {
    const newSelectBrand = selectBrand.filter(brand => brand !== value);
    setSelectBrand(newSelectBrand);
    setPageOne();
  };

  // filter color
  const [selectColor, setSelectColor] = useState([]);

  const delSelectColor = value => {
    const newSelectColor = selectColor.filter(color => color !== value);
    setSelectColor(newSelectColor);
    setPageOne();
  };

  // filter display
  const [selectDisplay, setSelectDisplay] = useState([]);

  const delSelectDisplay = value => {
    const newSelectDisplay = selectDisplay.filter(display => display !== value);
    setSelectDisplay(newSelectDisplay);
    setPageOne();
  };

  // filter price
  const { filterMinPrice, filterMaxPrice } = useSelector(filterProdState);

  // create filter URL params
  const urlParams = new URLSearchParams();

  if (selectPage) {
    urlParams.set("startPage", selectPage);
  }

  if (selectBrand.length > 0) {
    urlParams.set("brand", selectBrand);
  }

  if (selectColor.length > 0) {
    urlParams.set("color", selectColor);
  }

  if (selectDisplay.length > 0) {
    urlParams.set("display", selectDisplay);
  }

  if (filterMinPrice) {
    urlParams.set("minPrice", filterMinPrice);
  }

  if (filterMaxPrice) {
    urlParams.set("maxPrice", filterMaxPrice);
  }

  const url = urlParams.toString().replace(/%2C/g, ",");

  // dispatch filter URL
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchFilterProducts(url));
      navigate(`/products/filter?${url}`);
    }, 50);
    return () => clearTimeout(timer);
  }, [selectColor, selectBrand, selectDisplay, filterMaxPrice, filterMinPrice, selectPage]);

  // Implemented the ability to reuse the link without
  // losing the set parameters in the filter
  useEffect(() => {
    const params = new URLSearchParams(queryParams);
    const color = params.get("color");
    const brand = params.get("brand");
    const display = params.get("display");
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");
    const startPage = params.get("startPage");
    if (color) {
      const colorArr = color.split(",");
      setSelectColor(prevColorArr => prevColorArr.concat(colorArr));
    }
    if (brand) {
      const brandArr = brand.split(",");
      setSelectBrand(prevBrandArr => prevBrandArr.concat(brandArr));
    }
    if (display) {
      const displayArr = display.split(",");
      setSelectDisplay(prevDispArr => prevDispArr.concat(displayArr));
    }
    if (minPrice) {
      dispatch(setMinPrice(minPrice));
    }
    if (maxPrice) {
      dispatch(setMaxPrice(maxPrice));
    }
    if (startPage) {
      dispatch(setSelectPage(startPage));
    }
  }, []);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (<>
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
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("Apple")}
                      />
                      Apple
                    </span>
                  <span>
                      <Checkbox
                        name="Samsung"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("Samsung")}
                      />
                      Samsung
                    </span>
                  <span>
                      <Checkbox
                        name="Huawei"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("Huawei")}
                      />
                      Huawei
                    </span>
                  <span>
                      <Checkbox
                        name="Xiaomi"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectBrand([...selectBrand, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectBrand(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("Xiaomi")}
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
                <div className={style.checkbox}>
                    <span>
                      <Checkbox
                        name="0-256GB"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("0-256")}
                      />
                      0-256GB
                    </span>
                  <span>
                      <Checkbox
                        name="256-512GB"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("257-512")}
                      />
                      256-512GB
                    </span>
                  <span>
                      <Checkbox
                        name="512GB-1TB"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("513-1000")}
                      />
                      512GB-1TB
                    </span>
                </div>
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
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("LCD")}
                      />
                      LCD
                    </span>
                  <span>
                      <Checkbox
                        name="OLED"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("OLED")}
                      />
                      OLED
                    </span>
                  <span>
                      <Checkbox
                        name="AMOLED"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("AMOLED")}
                      />
                      AMOLED
                    </span>
                  <span>
                      <Checkbox
                        name="Retina"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectDisplay([...selectDisplay, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectDisplay(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("Retina")}
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
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectColor([...selectColor, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectColor(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("black")}
                      />
                      Black
                    </span>
                  <span>
                      <Checkbox
                        name="white"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectColor([...selectColor, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectColor(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("white")}
                      />
                      White
                    </span>
                  <span>
                      <Checkbox
                        name="other"
                        inputProps={{ "aria-label": "Checkbox demo" }}
                        onChange={e => {
                          if (e.target.checked) {
                            setSelectColor([...selectColor, e.target.name]);
                            setPageOne();
                          }
                          if (!e.target.checked) {
                            delSelectColor(e.target.name);
                          }
                        }}
                        checked={queryParams.includes("other")}
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
                <Checkbox inputProps={{ "aria-label": "Checkbox demo" }} />
                Сovers
              </span>
            <span>
                <Checkbox inputProps={{ "aria-label": "Checkbox demo" }} />
                Headphones
              </span>
            <span>
                <Checkbox inputProps={{ "aria-label": "Checkbox demo" }} />
                Charger
              </span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  </>);
}

export default SimpleAccordion;
