import React from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Icon } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { TREATMENTITEM } from '@/utils/claimConstant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import styles from './Item.less';

const Add = ({ incidentId, treatmentList, claimNo, dispatch }: any) => {
  const onAdd = () => {
    const treatmentId = uuidv4();

    let treatmentNo = 1;
    if (lodash.isArray(treatmentList)) {
      treatmentNo = treatmentList.length + 1;
    }

    const treatmentAdd = {
      ...TREATMENTITEM,
      claimNo,
      id: treatmentId,
      incidentId,
      treatmentNo,
    };

    dispatch({
      type: 'opusClaimDataCapture/treatmentAdd',
      payload: {
        incidentId,
        treatmentAdd,
      },
    });
  };

  return (
    <div className={styles.treatmentItem}>
      <div className={styles.titleRow}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
        })}
        <div className={styles.gap} />
        <Icon component={AddIcon} onClick={onAdd} />
      </div>
    </div>
  );
};

export default connect(({ opusClaimDataCapture }: any, { incidentId }: any) => ({
  treatmentList: opusClaimDataCapture.claimEntities?.incidentListMap?.[incidentId].treatmentList,
  claimNo: opusClaimDataCapture.claimProcessData.claimNo,
}))(Add);
