import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from 'antd';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DIAGNOSISITEM } from '@/utils/claimConstant';
import styles from './item.less';

export default ({ incidentId }: any) => {
  const dispatch = useDispatch();
  const claimNo = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimProcessData?.claimNo
  );
  const onAdd = () => {
    const addDiagnosisItem = {
      ...DIAGNOSISITEM,
      claimNo,
      id: uuidv4(),
      incidentId,
    };

    dispatch({
      type: 'opusClaimDataCapture/diagnosisAdd',
      payload: {
        incidentId,
        addDiagnosisItem,
      },
    });
  };

  return (
    <div className={styles.diagnosisItem}>
      <div className={styles.titleRow}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
        })}
        <div className={styles.gap} />
        <Icon component={AddIcon} onClick={onAdd} />
      </div>
    </div>
  );
};
