import React from 'react';
import Layout from '../Layout';
import Header from './NBHeader';
import Sider from './NBSider';
import Content from './NBContent';
import Provider from '../Context/Provider';

const Entrance = ({ buttonList, headerInfoConfig, title, appealFlag, children }: any) => {
  return (
    <Layout>
      <Header headerInfoConfig={headerInfoConfig} title={title} appealFlag={appealFlag} />
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
