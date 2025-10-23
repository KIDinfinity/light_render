import React from 'react';
import Layout from './Layout';
import ReCalculate from './ReCalculate';
import ReAutoUnderwrite from './ReAutoUnderwrite';
import GenerateSI from './GenerateSI';
import GetUWMeResult from './GetUWMeResult';
import InitialVersion from './InitialVersion';

export default () => {
  return (
    <Layout>
      <InitialVersion />
      <ReCalculate />
      <ReAutoUnderwrite />
      <GenerateSI />
      <GetUWMeResult />
    </Layout>
  );
};
