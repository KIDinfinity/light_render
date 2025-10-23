import React from 'react';
import { Button } from 'antd';
import styles from './ItemCard.less';

const ItemCard = ({ title, handleDel, handleAdd, disabled, children }) => {
  return (
    <div className={styles.itemCard}>
      {title && <div>{title}</div>}
      {React.Children.map(children, (item: any, idx: number) => (
        <div className={styles.main} key={idx}>
          {handleDel && (
            <Button
              className={styles.delBtn}
              icon="close"
              size="small"
              shape="circle"
              onClick={() => handleDel(idx)}
            />
          )}
          {item}
        </div>
      ))}
      {handleAdd && !disabled && (
        <Button
          className={styles.addBtn}
          shape="round"
          icon="plus"
          onClick={() => handleAdd()}
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default ItemCard;
