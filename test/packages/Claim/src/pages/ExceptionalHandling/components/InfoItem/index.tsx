import React from 'react';
import lodash from 'lodash';
import styles from './index.less';

const InfoItem = React.memo(
  ({ key, title, value, render, renderValue }: any) => {
    return (
      <li className={styles.item} key={key}>
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
      </li>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
export default InfoItem;
