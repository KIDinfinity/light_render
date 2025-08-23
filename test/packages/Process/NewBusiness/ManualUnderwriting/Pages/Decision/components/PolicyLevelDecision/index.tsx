import React from 'react';
import lodash from 'lodash';
import useGetPolicyDecision from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyDecision';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import { Row, Col } from 'antd';
import Exclusion from './components/Exclusion/index';
import Decision from './components/Decision/index';

const PolicyLevelDecision = () => {
  const policyDecision = useGetPolicyDecision();
  const decisionCode = formUtils.queryValue(lodash.get(policyDecision, 'uwDecision'));
  const record = {
    coreCode: 'All',
  };
  return (
    <div className={styles.decision}>
      <Row className={styles.decisionContent} gutter={[16, 16]} style={{ margin: 0 }}>
        <Col span={24} className={styles.wrapPadding}>
          <Decision decisionCode={decisionCode} />
        </Col>
      </Row>
      <div className={styles.policy}>
        <Exclusion record={record} />
      </div>
    </div>
  );
};

export default PolicyLevelDecision;
