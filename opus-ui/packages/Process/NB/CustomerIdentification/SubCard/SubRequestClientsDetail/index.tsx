import React from 'react';
import Profile from 'process/NB/CustomerIdentification/SubCard/Profile';
import Layout from 'process/NB/CustomerIdentification/SubCard/Layout';
import IdentityInfo from 'process/NB/CustomerIdentification/SubCard/SubRequestClientsDetail/IdentityInfo';

export default ({ item, columnList, policy }: any) => {
  return (
    <Layout>
      <Profile item={item} />
      <IdentityInfo item={item} policy={policy} columnList={columnList} />
    </Layout>
  );
};
