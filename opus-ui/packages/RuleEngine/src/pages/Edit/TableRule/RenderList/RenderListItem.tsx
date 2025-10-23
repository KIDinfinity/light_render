import React from 'react';
import { Checkbox } from 'antd';
import { map, compact } from 'lodash';
import styles from './index.less';

interface IProps {
  list: any[];
  standalone: boolean;
  onRequired: Function;
  onStandalone: Function;
}

const RenderListItem = ({ list, standalone = false, onRequired, onStandalone }: IProps) => {
  return map(compact(list), (item: any, index: number) => (
    <div className={styles.list} key={index}>
      <div className={styles.name}>
        <Checkbox onChange={onRequired} item={item} checked={standalone} standalone={standalone}>
          {item.formatName}
        </Checkbox>
      </div>
      {standalone && (
        <div className={styles.standalone}>
          <Checkbox item={item} checked={item.standalone} onChange={onStandalone} standalone />
        </div>
      )}
    </div>
  ));
};

export default RenderListItem;
