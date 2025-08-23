import React, { useCallback } from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import OptionalRecommendation from './OptionalRecommendation';
import Item from '../Item';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const dispatch = useDispatch();

  const options = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace?.sustainabilityModal?.sustainabilityOptions,
    shallowEqual
  );
  const handleSelect = useCallback(
    (item: any) => {
      dispatch({
        type: `${NAMESPACE}/changeSustainabilityCheckingSelected`,
        payload: {
          optionItem: item,
        },
      });
      dispatch({
        type: `${NAMESPACE}/saveSustainabilityAuditLog`,
        payload: {
          optionName: item?.optionName,
        },
      });
      dispatch({
        type: `${NAMESPACE}/saveSustainabilityValidate`,
        payload: {
          sustainabilityValidate: false,
        },
      });
    },
    [dispatch]
  );

  return (
    <Row>
      {lodash.map(options, (item: any) => {
        return (
          <Col span={5} key={item.id}>
            <Item
              active={item.applied === 'Y'}
              onClick={() => {
                handleSelect(item);
              }}
              title={item.title}
            />
          </Col>
        );
      })}
      <OptionalRecommendation />
    </Row>
  );
};
