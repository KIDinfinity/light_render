import React from 'react';
import lodash from 'lodash';
import styles from './InfoItem.less';

export default React.memo(
  ({ keyName, title, value, render, renderValue }: any) => {
    return (
      <li className={styles.item} key={keyName}>
        {lodash.isFunction(render) ? (
          render(value)
        ) : (
          <>
            <span className={styles.label}>{title}</span>
            {lodash.isFunction(renderValue) ? (
              <span className={styles.text}>{renderValue(value)}</span>
            ) : (
              <span className={styles.text}>{value?.toString()}</span>
            )}
          </>
        )}
        {/* {
          React.isValidElement()
        } */}
      </li>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
