import React from 'react';
import Layout from './Layout';
import AddExclusion from './AddExclusion';
import AddLoading from './AddLoading';
import Currency from './Currency';
import AddDPRemark from './AddDPRemark';
import SustainAbilityModalBtn from './SustainAbilityModalBtn';
import WaiveLoading from './WaiveLoading';

export default () => {
  return (
    <Layout>
      <SustainAbilityModalBtn />
      <WaiveLoading/>
      <Currency />
      <AddExclusion />
      <AddLoading />
      <AddDPRemark />
    </Layout>
  );
};
