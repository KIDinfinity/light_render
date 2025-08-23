import React from 'react';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { history } from 'umi';
import { ReactComponent as arrowAbbreviatedSvg } from 'claim/assets/arrow-abbreviated.svg';
import { ReactComponent as arrowExpansionModeSvg } from 'claim/assets/arrow-expansionMode.svg';
import styles from './index.less';
import { Mode } from '../Enum';

export default () => {
  const dispatch = useDispatch();

  const mode = useSelector((state: any) => state.leaveManagement.mode);
  const { taskDefKey, taskId } = useSelector((state: any) => state.processTask.getTask);
  const isAbbreviatedMode = mode === Mode.Abbreviated;

  const goExpansionMode = async () => {
    await dispatch({
      type: 'leaveManagement/saveSnapshot',
    });
    if (!isAbbreviatedMode) {
      await dispatch({
        type: 'global/visitTaskDetail',
        payload: {
          taskId,
          taskDefKey,
        },
      });
    } else {
      history.push('/navigator/user/management/basicInfo');
      await dispatch({
        type: 'leaveManagement/saveModalTaskId',
        payload: {
          modalTaskId: taskId,
        },
      });
      await dispatch({
        type: 'leaveManagement/saveState',
        payload: {
          showModal: true,
        },
      });
    }
    await dispatch({
      type: 'leaveManagement/saveMode',
      payload: {
        mode: !isAbbreviatedMode ? Mode.Abbreviated : Mode.Expansion,
      },
    });
  };
  return (
    <div className={styles.arrow}>
      <div className={styles.mode} onClick={goExpansionMode}>
        <Icon component={isAbbreviatedMode ? arrowAbbreviatedSvg : arrowExpansionModeSvg} />
      </div>
    </div>
  );
};
