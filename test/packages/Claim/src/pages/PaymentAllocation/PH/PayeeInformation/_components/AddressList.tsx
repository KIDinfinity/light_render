import React from 'react';
import lodash from 'lodash';
import Item from './AddressItem';
import styles from '../index.less';

// TODO:初始化不应该渲染
export default ({ list }: any) => {
  return (
    <div className={styles.section}>
      <div className={styles.title}>Address Info</div>
      <div className={styles.item}>
        {lodash.map(list || [], (item: any, idx: number) => (
          <Item item={item} idx={idx} key={item.id}/>
        ))}
      </div>
    </div>
  );
};
