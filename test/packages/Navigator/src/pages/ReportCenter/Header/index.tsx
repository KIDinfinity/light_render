import React from 'react';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const Title = (text: string) => {
  const needTransform = /[0-9a-z]/i.test(text);
  const textUpper = text.trim().toUpperCase();
  if (needTransform) {
    return lodash.map(textUpper.split(/\s+/), (word: string, index: number) => (
      <span key={`${word}${index}`}>
        <span className="bigWord">{word.slice(0, 1)}</span>
        {word.slice(1)}
      </span>
    ));
  }
  return textUpper;
};

const Header = React.memo(() => (
  <div className={styles.header}>
    <div className="ctn">
      <div className="title">
        {Title(formatMessageApi({ Label_BIZ_Claim: 'navigator.title.reportCenter' }))}
      </div>
    </div>
  </div>
));

export default Header;
