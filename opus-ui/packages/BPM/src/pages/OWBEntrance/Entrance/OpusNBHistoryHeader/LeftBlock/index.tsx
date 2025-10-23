import React from 'react';
import Layout from './Layout';
import BackButton from './BackButton';
import ApplicationNo from './ApplicationNo';

const LeftBlock = () => {
  return (
    <>
      <Layout>
        <BackButton />
        <ApplicationNo />
      </Layout>
    </>
  );
};

LeftBlock.displayName = 'leftBlock';

export default LeftBlock;
