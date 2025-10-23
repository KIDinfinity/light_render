import React from 'react';
import { useDispatch } from 'dva';
import { Icon } from 'antd';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { ReactComponent as incidentSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleIncident.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './Item.less';

export default () => {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch({
      type: 'opusClaimDataCapture/incidentAdd',
      payload: {
        changedValues: {},
      },
    });
  }

  return (
    <div className={styles.incidentHeader}>
      <div className={styles.titleRow}>
        <Icon component={incidentSvg} className={styles.titleIcon} />
        {`${formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
        })} No. 1`}
        <div className={styles.gap} />
        <Icon component={AddIcon} onClick={onAdd} />
      </div>
    </div>
  )
};
