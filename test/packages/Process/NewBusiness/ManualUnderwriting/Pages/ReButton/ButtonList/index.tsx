import React from 'react';
import Layout from './Layout';
import ReCalculate from './ReCalculate';
import ReAutoUnderwrite from './ReAutoUnderwrite';
import GenerateSI from './GenerateSI';
import CheckAMLOrCRR from './CheckAMLOrCRR';
import GetUWMeResult from './GetUWMeResult';
import InitialVersion from './InitialVersion';
import AddLinkedPolicy from './AddLinkedPolicy';

export default () => {
  return (
    <Layout>
      <InitialVersion />
      <ReCalculate />
      <ReAutoUnderwrite />
      <GenerateSI />
      <CheckAMLOrCRR />
      <GetUWMeResult />
      <AddLinkedPolicy />
    </Layout>
  );
};
