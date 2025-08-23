import React, { useEffect } from 'react';
import lodash from 'lodash';
import {  useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Row, Checkbox, Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as taskIcon } from './images/task.svg';
import styles from './TaskFolder.less';

export default () => {
  const dispatch = useDispatch();
  const { allFolder, selectedFolder } = useSelector(
    (state: any) => ({
      allFolder: state.taskFolder.allFolder,
      selectedFolder: state.taskFolder.selectedFolder,
    }),
    shallowEqual
  );
  useEffect(() => {
    return () => {
      dispatch({
        type: 'taskFolder/resetSelectedFolder',
      });
    };
  }, []);
  const handleChange = (e) => {
    const { value } = e.target;

    dispatch({
      type: 'taskFolder/setSelectedFolder',
      payload: {
        value,
      },
    });
  };
  const formatMap = {
    todo: 'app.navigator.taskDetail.inquireForm.label.to-do',
    pending: 'app.navigator.drawer.pending.label.pending',
    favorite: 'app.navigator.index.mode.flow.favorite',
    completed: 'app.navigator.index.mode.flow.completed',
    unassigned: 'app.navigator.index.mode.flow.unassigned',
  };
  return (
    <Row type="flex" className={styles.wrap}>
      <div className={styles.taskTitle}>
        <Icon component={taskIcon} />
        <span>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.title.task-folder',
          })}
        </span>
      </div>
      <div className={styles.taskList}>
        {lodash
          .chain(allFolder)
          .filter((item) => lodash.isPlainObject(item))
          .map((item) => (
            <Checkbox
              checked={selectedFolder.includes(item.name)}
              key={item.name}
              value={item.name}
              onChange={handleChange}
              disabled={item.disabled}
              style={{ color: 'var(--navigator-usermanagement-customization-checkbox-color)' }}
            >
              {item.title && formatMessageApi({ Label_BIZ_Claim: formatMap[item.title] })}
            </Checkbox>
          ))
          .value()}
      </div>
    </Row>
  );
};
