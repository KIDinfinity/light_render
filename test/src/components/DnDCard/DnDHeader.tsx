import React from 'react';
import { Icon } from 'antd';
import classnames from 'classnames';
import DnD from './DnD';
import styles from './index.less';

export default ({
  children,
  record,
  array,
  onSort,
  onRemove = () => {},
  showBtn = true,
  DndCard = true,
  removeHover = true,
  config = {
    className: styles.DnDHeader,
  },
  sortKey,
  ...resProps
}: any) => {
  return (
    <th {...resProps} id={styles.Dndth}>
      <DnD record={record} array={array} onSort={onSort} sortKey={sortKey} {...config}>
        <div
          className={classnames(styles.DnDHeader,{
            [styles.DndCard]: DndCard,
            [styles.hide]: !record?.visible,
            [styles.removeHover]: removeHover,
          })}
        >
          {children}
          {showBtn && (
            <div
              className={styles.close}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(record);
              }}
            >
              <Icon type="minus" />
            </div>
          )}
        </div>
      </DnD>
    </th>
  );
};
