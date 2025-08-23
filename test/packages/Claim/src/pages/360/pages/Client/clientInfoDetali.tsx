import React from 'react';
import { useSelector } from 'dva';
import { Row, Col } from 'antd';
import FullClientInfo from './fullClientInfo';
import ClientList from './clientList';

export default () => {
  const sideBarOverallList = useSelector(({ insured360 }: any) => insured360?.sideBarOverallList);

  const clientListIsOnlyOne: boolean =
    !sideBarOverallList?.length || sideBarOverallList.length <= 1;
  return (
    <Row gutter={16} type="flex">
      <Col span={clientListIsOnlyOne ? 24 : 12}>
        <FullClientInfo />
      </Col>
      {!clientListIsOnlyOne && (
        <Col span={12}>
          <ClientList />
        </Col>
      )}
    </Row>
  );
};
