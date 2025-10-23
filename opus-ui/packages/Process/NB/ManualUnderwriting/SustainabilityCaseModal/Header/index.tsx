import React from 'react';
import Capitalize from 'basic/components/CaseHeader/Capitalize';
import styles from './index.less';

const Header = () => {
  return (
    <div className={styles.container}>
      <Capitalize title="Sustainability Checking" />
    </div>
  );
};

Header.displayName = 'header';

export default Header;
