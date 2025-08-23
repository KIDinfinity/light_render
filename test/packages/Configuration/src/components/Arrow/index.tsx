import React from 'react';
import { Icon } from 'antd';
import { connect } from 'dva';
import { ReactComponent as arrowAbbreviatedSvg } from 'claim/assets/arrow-abbreviated.svg';
import { history } from 'umi';
import { ReactComponent as arrowExpansionModeSvg } from 'claim/assets/arrow-expansionMode.svg';
import styles from './index.less';
import { Mode } from 'configuration/constant';

const Arrow = ({ taskDetail, mode, dispatch, type }: any) => {
  const ToAbbreviatedMode = mode === Mode.Abbreviated;
  const toggleMode = async () => {
    const { taskDefKey, taskId } = taskDetail;
    await dispatch({
      type: `${type}/saveSnapshot`,
    });
    if (ToAbbreviatedMode) {
      history.push('/navigator/configuration');
      await dispatch({
        type: 'configurationController/showModal',
        payload: {
          modalTaskId: taskId,
        },
      });
    } else {
      await dispatch({
        type: 'global/visitTaskDetail',
        payload: {
          taskId,
          taskDefKey,
        },
      });
    }
    setTimeout(async () => {
      dispatch({
        type: 'configurationController/saveMode',
        payload: {
          mode: ToAbbreviatedMode ? Mode.Expansion : Mode.Abbreviated,
        },
      });
    }, 300);
  };
  return (
    <div className={styles.arrow}>
      <div className={styles.mode} onClick={toggleMode}>
        <Icon component={ToAbbreviatedMode ? arrowAbbreviatedSvg : arrowExpansionModeSvg} />
      </div>
    </div>
  );
};

export default connect(({ processTask }: any) => ({
  taskDetail: processTask.getTask,
}))(Arrow);
