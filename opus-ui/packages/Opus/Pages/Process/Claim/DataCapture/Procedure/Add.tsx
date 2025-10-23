import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import changeProcedureType from '../_models/functions/changeProcedureType';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './item.less';

const Add = ({ procedureList, dispatch, claimNo, treatmentId }: any) => {
  const onAdd = () => {
    changeProcedureType({
      dispatch,
      treatmentId,
      claimNo,
      procedureList,
    });
  };

  return (
    <div className={styles.therapyItem}>
      <div className={styles.titleRow}>
        {formatMessageApi({
          Label_BIZ_Claim: 'Therapies',
        })}
        <div className={styles.gap} />
        <Icon component={AddIcon} onClick={onAdd} />
      </div>
    </div>
  );
};

export default connect(({ opusClaimDataCapture }: any, { treatmentId }: any) => ({
  procedureList: opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
  claimNo: opusClaimDataCapture.claimProcessData?.claimNo,
}))(Add);
