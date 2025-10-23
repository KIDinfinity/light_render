import React from 'react';
import Profile from '../Profile';
import Layout from '../Layout';
import IdentityInfo from '../SubRequestClientsDetail/IdentityInfo';

export default ({ item, columnList, policy }: any) => {
  return (
    <Layout>
      <Profile item={item} />
      <IdentityInfo item={item} policy={policy} columnList={columnList} />
    </Layout>
  );
};
