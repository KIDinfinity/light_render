import React from 'react';
import Layout from '../Layout';
import Header from './POSHeader';
import Sider from './POSSider';
import Content from './POSContent';
import Provider from '../Context/Provider';

const Entrance = ({ buttonList, headerInfoConfig, title, children, indicator = {} }: any) => {
  return (
    <Layout>
      <Header headerInfoConfig={headerInfoConfig} title={title} indicator={indicator} />
      <Sider buttonList={buttonList} />
      <Content>{children}</Content>
    </Layout>
  );
};

export default (props: any) => (
  <Provider>
    <Entrance {...props} />
  </Provider>
);
