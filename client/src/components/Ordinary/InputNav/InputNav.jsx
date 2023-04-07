import React from 'react';

import styles from './InputNav.module.scss';

function InputNav() {
  return (
    <form className={styles.form} action="">
      <div className={styles.group}>
        <input className={styles.input} id="search" type="text" required />
        <span className={styles.bar}>{}</span>
        <label className={styles.label}>Search</label>
      </div>
    </form>
  );
}

export default InputNav;
