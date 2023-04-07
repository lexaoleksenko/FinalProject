import React from 'react';
import PropTypes from 'prop-types';

import style from './Marquee.module.scss';

function Marquee({ content, stream }) {
  return (
    <div className={style.marquee}>
      <div
        className={
          stream === 'left' ? style.marquee_line_L : style.marquee_line_R
        }
      >
        <div className={style.marquee_content}>
          {content}
          {content}
          {content}
        </div>
        <div className={style.marquee_content}>
          {content}
          {content}
          {content}
        </div>
        <div className={style.marquee_content}>
          {content}
          {content}
          {content}
        </div>
        <div className={style.marquee_content}>
          {content}
          {content}
          {content}
        </div>
      </div>
    </div>
  );
}

Marquee.defaultProps = {
  content: 'Hello world!!!',
  stream: 'left',
};

Marquee.propTypes = {
  content: PropTypes.string,
  stream: PropTypes.string,
};

export default Marquee;
