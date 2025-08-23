import React from 'react';
import lodash from 'lodash';
import styles from './ProcessBar.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default ({ title, barItems }) => (
  <div className={styles.processBar}>
    <i className={styles.circle} />
    <span>{title}</span>
    <div className={styles.bar}>
      {lodash.isArray(barItems) &&
        lodash.map(
          barItems,
          (item) =>
            lodash.isPlainObject(item) && (
              <div key={item.processActivityKey} className={styles[`barItem_${item.authActivity}`]}>
                {formatMessageApi({ activity: item.processActivityKey })}
              </div>
            )
        )}
    </div>
  </div>
);
