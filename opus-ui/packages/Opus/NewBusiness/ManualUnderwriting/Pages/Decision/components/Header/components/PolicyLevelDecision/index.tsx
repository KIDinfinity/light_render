import React from 'react';
import lodash from 'lodash';
import useGetPolicyDecision from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetPolicyDecision';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import { Row, Col } from 'antd';
import Decision from './components/Decision/index';
import UWMEDecision from './components/UWMEDecision/index';

const PolicyLevelDecision = () => {
  const policyDecision = useGetPolicyDecision();
  const decisionCode = formUtils.queryValue(lodash.get(policyDecision, 'uwDecision'));

  return (
    <div className={styles.decision}>
      <Row className={styles.decisionContent} gutter={[16, 16]} style={{ margin: 0 }}>
        <Col span={24}>
          <UWMEDecision decisionCode={decisionCode} />
        </Col>
      </Row>
      <Row className={styles.decisionContent} gutter={[16, 16]} style={{ margin: 0 }}>
        <Col span={24}>
          <Decision decisionCode={decisionCode} />
        </Col>
      </Row>
    </div>
  );
};

export default PolicyLevelDecision;
