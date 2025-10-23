import React from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'dva';
import RequestType from './RequestType';
import PolicyInfo from './PolicyInfo';
import CustomerInfo from './CustomerInfo';
import LetterInfo from './LetterInfo';
import { NAMESPACE } from 'claimBasicProduct/pages/SimplifiedDigital/CaseCreation/activity.config';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import styles from './index.less';

export default function Page() {
  const businessType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.businessType
  );

  const layout = {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 24 },
    lg: { span: 24 },
  };

  return (
    <div className={styles.page}>
      <Row gutter={24}>
        <Col {...layout}>
          <RequestType />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...layout}>
          <PolicyInfo />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...layout}>
          <CustomerInfo />
        </Col>
      </Row>
      {!lodash.isEmpty(formUtils.queryValue(businessType)) && (
        <Row gutter={24}>
          <Col {...layout}>
            <LetterInfo />
          </Col>
        </Row>
      )}
    </div>
  );
}
