import React from 'react';
import FormLayout from 'basic/components/Form/FormLayout';
import PosRequest from '../../Section/PosRequest';
import Insured from '../../Section/Insured';
import PolicyOwner from '../../Section/PolicyOwner';
import ContactAddress from '../../Section/ContactAddress';

const BaseInfo = () => {
  return (
    <FormLayout
      layConf={{
        default: 24,
        insured: 12,
        policyOwner: 12,
      }}
    >
      <PosRequest name="PosRequest" />
      {/**
        @ts-ignore */}
      <PolicyOwner name="policyOwner" />
      {/**
        @ts-ignore */}
      <Insured name="insured" />
      {/* @ts-ignore  */}
      <ContactAddress name="ContactAddress" />
    </FormLayout>
  );
}

export default BaseInfo;
