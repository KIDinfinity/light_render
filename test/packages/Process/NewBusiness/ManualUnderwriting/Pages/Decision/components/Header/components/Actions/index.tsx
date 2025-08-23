import React from 'react';
import Layout from './Layout';
import AddExclusion from './components/AddExclusion';
import AddLoading from './components/AddLoading';
import Currency from './components/Currency';
import AddDPRemark from './components/AddDPRemark';
import SustainAbilityModalBtn from './components/SustainAbilityModalBtn';
import WaiveLoading from './components/WaiveLoading';

export default () => {
  return (
    <Layout>
      <SustainAbilityModalBtn />
      <WaiveLoading />
      <Currency />
      <AddExclusion />
      <AddLoading />
      <AddDPRemark />
    </Layout>
  );
};
