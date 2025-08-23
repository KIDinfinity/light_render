import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import Layout from './Layout';
import PolicyId from './PolicyId';
import OWBStatus from './OWBStatus';
import LAStatus from './LAStatus';
import { NAMESPACE } from '../activity.config';

const PolicyNo = () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const policy = lodash.get(businessData, 'policyList[0]')

  return (
    <Layout>
      <PolicyId policy={policy} />
      <OWBStatus policy={policy} />
      <LAStatus policy={policy} />
    </Layout>
  );
};

PolicyNo.displayName = 'policyNo';

export default PolicyNo;
