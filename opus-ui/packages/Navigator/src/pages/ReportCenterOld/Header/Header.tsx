import React from 'react';
import lodash from 'lodash';
import styles from './header.less';

const Title = (text: string) => {
  const needTransform = /[0-9a-z]/i.test(text);
  const textUpper = text.trim().toUpperCase();
  if (needTransform) {
    return lodash.map(textUpper.split(/\s+/), (word: string) => (
      <>
        <span className="bigWord">{word.slice(0, 1)}</span>
        {word.slice(1)}
      </>
    ));
  }
  return textUpper;
};

const Header = React.memo(() => (
  <div className={styles.header}>
    <div className="ctn">
      <div className="title">{Title('Report Center')}</div>
    </div>
  </div>
));

export default Header;
