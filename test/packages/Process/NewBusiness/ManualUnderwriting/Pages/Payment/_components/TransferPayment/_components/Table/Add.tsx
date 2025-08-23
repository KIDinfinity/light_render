import React from 'react';
import { Input, Row, Col } from 'antd';
import { useDispatch } from 'dva';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

const Add = () => {
  const dispatch = useDispatch();

  return (
    <Row>
      <Col span={6}>
        <Input
          onBlur={(e: any) => {
            dispatch({
              type: `${NAMESPACE}/validateTransferPolicyId`,
              payload: {
                policyId: e.target.value,
              },
            });
          }}
        />
      </Col>
    </Row>
  );
};

export default Add;
