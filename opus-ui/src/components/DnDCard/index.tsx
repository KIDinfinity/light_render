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
  config = {},
}: any) => {
  return (
    // @ts-ignore
    <DnD record={record} array={array} onSort={onSort} {...config}>
      <div
        className={classnames({
          [styles.DndCard]: DndCard,
          [styles.hide]: !record?.visible,
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
  );
};
