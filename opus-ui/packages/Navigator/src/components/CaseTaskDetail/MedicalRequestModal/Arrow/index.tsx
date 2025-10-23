import React from 'react';
import { Icon } from 'antd';
import { history } from 'umi';
import { useSelector, useDispatch } from 'dva';
import { ReactComponent as arrowAbbreviatedSvg } from 'claim/assets/arrow-abbreviated.svg';
import { ReactComponent as arrowExpansionModeSvg } from 'claim/assets/arrow-expansionMode.svg';
import styles from './index.less';
import { Mode } from 'configuration/constant';

const Arrow = ({ mode, type }: any) => {
  const dispatch = useDispatch();
  const ToAbbreviatedMode = mode === Mode.Abbreviated;
  const modalTaskId: any = useSelector((state: any) => state.processTask?.subTaskId);
  const toggleMode = async () => {
    await dispatch({
      type: `${type}/saveSnapshot`,
    });
    if (ToAbbreviatedMode) {
      history.go(-1);
    } else {
      history.push(`/process/task/detail/${modalTaskId}`, '_blank');
    }
    setTimeout(async () => {
      dispatch({
        type: 'medicalRequestFlow/saveMode',
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
export default Arrow;
