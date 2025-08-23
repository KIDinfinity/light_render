import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { Icon, Badge } from 'antd';
import { SmartCircleKey } from 'navigator/enum/MachineKey';
import styles from './SmartCircleMenu.less';

export default () => {
  const dispatch = useDispatch();
  const messageNum = useSelector((state: any) => state.smartCircleNotification.messageNum);

  useEffect(() => {
    dispatch({ type: 'smartCircleNotification/messageList' });
  }, [messageNum]);

  const handleShowMessageList = async () => {
    await dispatch({
      type: 'workspaceAI/saveSearchValue',
      payload: {
        searchValue: '',
      },
    });
    await dispatch({
      type: 'workspaceAI/saveMachineKey',
      payload: { machineKey: SmartCircleKey.ListNote },
    });
    await dispatch({ type: 'smartCircleNotification/messageList' });
  };

  return (
    <div className={styles.wrapper}>
      <Badge count={messageNum} overflowCount={99} onClick={() => handleShowMessageList()}>
        <Icon type="bell" />
      </Badge>
    </div>
  );
};
