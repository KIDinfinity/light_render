import React from 'react';
import classnames from 'classnames';
import styles from './ValueComponent.less';

const valueComponent = ({ value, isDiv = false, isValue = false }: any) => {
  return (
    <>
      {!!isDiv ? (
        <div
          className={classnames(styles.titleItem, isValue ? styles.itemValue : styles.itemTitle)}
        >
          {value}
        </div>
      ) : (
        <span
          className={classnames(styles.titleItem, isValue ? styles.itemValue : styles.itemTitle)}
        >
          {value}
        </span>
      )}
    </>
  );
};
export default valueComponent;
