import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Row, Col } from 'antd';
import useRegisteredSlots from 'basic/hooks/useRegisteredSlots';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { ActivityStatus } from 'bpm/pages/Information/enum/index';
import useCalcSectionColSpan from 'process/NB/ManualUnderwriting/_hooks/useCalcSectionColSpan';
import styles from './index.less';

export default ({ children }: any) => {
  const slots = useRegisteredSlots({ children });
  const taskStatus = useSelector(({ processTask }: any) => processTask.getTask?.taskStatus);
  const taskEditable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const failCloseEnquiry = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.failCloseEnquiry,
    shallowEqual
  );
  const colSpan = useCalcSectionColSpan();
  return (
    <div className={styles.container}>
      {failCloseEnquiry === 'Y' && (
        <div className={styles.errorMessage}>{slots.get('errorMessage')}</div>
      )}
      <div className={styles.PolicyNo}>{slots.get('policyNo')}</div>
      <div className={styles.client}>{slots.get('client')}</div>
      <div className={styles.PlanInfo}>{slots.get('planInfo')}</div>
      {taskStatus !== ActivityStatus.Completed && taskEditable && (
        <div className={styles.reButton}>{slots.get('reButton')}</div>
      )}
      <div className={styles.decision}>{slots.get('decision')}</div>
      <div className={styles.decision}>
        <Row type="flex" gutter={16}>
          <Col span={colSpan.loan}>{slots.get('loan')}</Col>
          <Col span={colSpan.fund}>{slots.get('fund')}</Col>
          <Col span={colSpan.takeOver}>{slots.get('takeOver')}</Col>
          <Col span={colSpan.policyReplacement}>{slots.get('policyReplacement')}</Col>
          <Col span={colSpan.voiceRecord}>{slots.get('voiceRecord')}</Col>
        </Row>
      </div>
      <div className={styles.distributionchannel}>{slots.get('distributionchannel')}</div>
    </div>
  );
};
