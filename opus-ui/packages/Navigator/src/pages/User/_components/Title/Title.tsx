import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './Title.less';

const title = formatMessageApi({
  Label_BIZ_Claim: 'app.usermanagement.basicInfo.title',
});

const titleArr = lodash.chain(title).split(' ').compact().value();

export default () => (
  <div className={styles.title}>
    {lodash.map(titleArr, (item, key) => (
      <span key={key}>
        <span className={styles.first}>{item.substr(0, 1)}</span>
        <span>{item.substr(1)}</span>&nbsp;
      </span>
    ))}
  </div>
);
