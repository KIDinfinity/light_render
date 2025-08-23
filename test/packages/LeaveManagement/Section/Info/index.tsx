import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { List } from 'antd';
import Item from './item';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const details = useSelector((state: any) => state.leaveManagement.businessData.details || []);

  const handlClose = (id: string) => {
    dispatch({
      type: 'leaveManagement/removeLeaveItem',
      payload: {
        id,
      },
    });
  };

  return (
    <List
      className={styles.info}
      grid={{ gutter: 10, column: 1 }}
      dataSource={details}
      renderItem={(item: any, index: number) => (
        <List.Item>
          <Item item={item} index={index} handlClose={handlClose} />
        </List.Item>
      )}
    />
  );
};
