import React from 'react';
import { connect, useSelector } from 'dva';
import { Row, Col, Icon } from 'antd';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { SectionTitle } from './Section';
import headerStyles from './Header.less';
import styles from './TreatmentListItem.less';

const Add = ({ incidentId, dispatch }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const onAdd = () => {
    dispatch({
      type: 'opusClaimAssessment/addTreatment',
      payload: {
        incidentId,
      },
    });
  };

  return (
    <div className={styles.treatmentItem}>
      <Row type="flex" gutter={0}>
        <Col span={10}>
          <div className={styles.treatmentContainer} style={{ minHeight: 'auto' }}>
            <div className={headerStyles.header}>
              <div className={headerStyles.title}>
                <SectionTitle suffix={` No. 1`} />
              </div>
              <div className={headerStyles.section}>
                {editable && <Icon component={AddIcon} onClick={onAdd} />}
              </div>
            </div>
          </div>
        </Col>
        <Col span={14} className={styles.right} />
      </Row>
    </div>
  );
};

export default connect(({ opusClaimDataCapture }: any, { incidentId }: any) => ({
  treatmentList: opusClaimDataCapture.claimEntities?.incidentListMap?.[incidentId].treatmentList,
  claimNo: opusClaimDataCapture.claimProcessData.claimNo,
}))(Add);
