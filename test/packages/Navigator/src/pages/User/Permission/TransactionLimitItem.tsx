import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './TransactionLimitItem.less';

enum LimitCode {
  Decline = 'Decline',
}

export default ({ item }) => {
  let controlLimit = '';

  if (lodash.isPlainObject(item) && item.limitCode === LimitCode.Decline) {
    if (item.decline === true) {
      controlLimit = 'Yes';
    } else {
      controlLimit = 'No';
    }
  } else {
    controlLimit = item.max < 0 ? item.displayDescription : item.max;
  }

  return (
    <>
      {lodash.isPlainObject(item) ? (
        <div className={styles.TransationBlock}>
          <p className={styles.title}>{item.limitCodeName}</p>
          <div className={styles.show}>
            <div className={styles.left}>
              <div className={styles.bigFont}>{controlLimit}</div>
              <span className={styles.smallFont}>
                {formatMessageApi({
                  Label_COM_UserCenter: 'limitValue',
                })}
              </span>
            </div>

            <div className={styles.right}>
              <div className={styles.bigFont}>{item.limitCodeValue}</div>
              <span className={styles.smallFont}>
                {formatMessageApi({
                  Label_COM_UserCenter: 'limitType',
                })}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
