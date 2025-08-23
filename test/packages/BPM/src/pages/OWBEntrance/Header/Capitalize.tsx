import React from 'react';
import lodash from 'lodash';
import { Language } from '@/components/Tenant';
import styles from './Capitalize.less';

export default ({ title = '', activeLanguage }: any) => {
  if (typeof title !== 'string') {
    return <div className={styles.title}>-</div>;
  }

  const titleC =
    activeLanguage === Language.EN_US
      ? lodash.map(title.split(' '), (word, key) => (
          <span key={key.toString()}>
            {
              <span>
                <span className={styles.first}>{word.slice(0, 1)}</span>
                <span>{word.slice(1)}</span>
              </span>
            }{' '}
          </span>
        ))
      : title;

  return <div className={styles.title}>{titleC}</div>;
};
