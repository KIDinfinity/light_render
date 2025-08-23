import React from 'react';
import Title from './Title';
import ExpandButton from './ExpandButton';
import styles from './index.less';

const Header = () => {
  return (
    <div className={styles.container}>
      <Title />
      <ExpandButton />
    </div>
  );
};

Header.displayName = 'header';

export default Header;
