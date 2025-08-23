import React from 'react';
import { useSelector } from 'dva';
import { List } from 'antd';
import Item from './Item';
import styles from './List.less';

export default (props) => {
  const messageList = useSelector((state) => state.smartCircleNotification.messageList);

  return (
    <div className={styles.list}>
      <List
        itemLayout="horizontal"
        dataSource={messageList.rows}
        renderItem={(item, idx) => <Item item={item} idx={idx} {...props} />}
      />
    </div>
  );
};
