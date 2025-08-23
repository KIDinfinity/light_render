import React from 'react';

import Layout from './Layout';
import PolicyId from './PolicyId';
import OWBStatus from './OWBStatus';
import LAStatus from './LAStatus';

const PolicyNo = () => {

  return (
    <Layout>
      <PolicyId />
      <OWBStatus />
      <LAStatus />
    </Layout>
  );
};

PolicyNo.displayName = 'policyNo';

export default PolicyNo;
