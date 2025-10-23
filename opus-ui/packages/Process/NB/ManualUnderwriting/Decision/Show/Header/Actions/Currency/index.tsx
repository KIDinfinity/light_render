import React from 'react';
import classnames from 'classnames';
import CurrencySection from './CurrencySection';
import styles from './index.less';

const Currency = () => {
  return (
    <div className={styles.container}>
      <span className={styles.element}>Currency</span>
      <div className={classnames(styles.element, styles.section)}>
        <CurrencySection />
      </div>
    </div>
  );
};

Currency.displayName = 'currency';

export default Currency;
