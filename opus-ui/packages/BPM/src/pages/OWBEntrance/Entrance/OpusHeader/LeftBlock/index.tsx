import React from 'react';
import Layout from './Layout';
import Activity from './Activity';
import BackButton from './BackButton';
import ApplicationNo from './ApplicationNo';
import DueDate from './DueDate';

const LeftBlock = () => {
  return (
    <>
      <Layout>
        <BackButton />
        <Activity />
        <ApplicationNo />
        <DueDate />
      </Layout>
    </>
  );
};

LeftBlock.displayName = 'leftBlock';

export default LeftBlock;
