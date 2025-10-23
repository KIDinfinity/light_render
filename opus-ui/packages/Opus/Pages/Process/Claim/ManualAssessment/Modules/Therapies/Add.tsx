import React from 'react';

import { connect } from 'dva';
import { Col, Row, Icon } from 'antd';
import changeProcedureType from '../../_models/functions/changeProcedureType';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

const AddProcedure = ({ havePayable, treatmentId, dispatch, claimNo, procedureList }: any) => {
  const onAdd = () => {
    changeProcedureType({
      dispatch,
      treatmentId,
      claimNo,
      procedureList,
    });
  };

  return (
    <Row type="flex" gutter={0}>
      <Col span={10}>
        <div className={styles.card}>
          <div className={styles.therapyItem}>
            <div className={styles.titleRow}>
              {formatMessageApi({
                Label_BIZ_Claim: 'Therapies',
              })}
              <div className={styles.gap} />
              <Icon component={AddIcon} onClick={onAdd} />
            </div>
          </div>
        </div>
      </Col>
      {havePayable && (
        <Col span={14} className={styles.right}>
          <div className={styles.emptyTherapyWrap} />
        </Col>
      )}
    </Row>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
  procedureList: modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
  claimNo: modelnamepsace.claimProcessData?.claimNo,
}))(AddProcedure);
