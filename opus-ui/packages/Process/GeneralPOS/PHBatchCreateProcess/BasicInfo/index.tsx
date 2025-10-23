import React from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import layout from './layout';
import PosRequest from '../Section/PosRequest';
import PolicyOwner from '../Section/PolicyOwner';
import Insured from '../Section/Insured';

const BasicInfo = () => {
  return (
    <FormLayout json={layout}>
      <PosRequest name="posRequest" />
      <PolicyOwner name="policyOwner" />
      <Insured name="insured" />
    </FormLayout>
  );
};

export default BasicInfo;
