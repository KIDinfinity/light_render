import React from 'react';
import lodash from 'lodash';
import { Row, Col } from 'antd';
import useGetSustainabilityCheckingOptions from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingOptions';
import OptionalRecommendation from './OptionalRecommendation';
import Item from '../Item';

export default () => {
  const options = useGetSustainabilityCheckingOptions();

  return (
    <Row>
      {lodash.map(options, (item: any) => {
        return (
          <Col span={5} key={item.id}>
            <Item item={item} />
          </Col>
        );
      })}
      <OptionalRecommendation />
    </Row>
  );
};
