import React, { useState } from 'react';
import { Tooltip, Spin } from 'antd';
import classNames from 'classnames';
import Empty from '@/components/Empty';
import lodash, { isEmpty, size, get } from 'lodash';
import styles from './index.less';

export default ({
  children,
  getPermissionList,
  list,
  code = 'code',
  name = 'name',
  title = '',
  layout = 'default',
}: any) => {
  const [showList, setShowList] = useState(false);
  const visibleChange = (visible: any) => {
    if (visible) {
      setShowList(true);
      getPermissionList && getPermissionList();
    } else {
      setShowList(false);
    }
  };

  const renderItem = (item: any, index: number) => {
    return (
      <div className={styles.item} key={`${get(item, code)}${index}`}>
        {get(item, name)}
      </div>
    );
  };

  const render = () => {
    return showList && size(list) ? (
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {lodash.map(list, (item: any, index: any) => renderItem(item, index))}
        {isEmpty(list) && <Empty />}
      </div>
    ) : (
      <div className={classNames(styles.content, styles.loading)}>
        <Spin tip="Loading..." size="large" />
      </div>
    );
  };
  return (
    <div className={classNames(styles.sectionModal, styles.twoColumns)}>
      <Tooltip
        arrowPointAtCenter
        autoAdjustOverflow
        overlayClassName="section-tooltip"
        getPopupContainer={(triggerNode) => {
          return document.body;
        }}
        onVisibleChange={(visible) => visibleChange && visibleChange(visible)}
        placement="right"
        title={render()}
      >
        {children}
      </Tooltip>
    </div>
  );
};
