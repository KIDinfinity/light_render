import React from 'react';
import layout from './layout';
import FormLayout from 'basic/components/Form/FormLayout';
import TransactionType from '../Section/TransactionType';
import ProcessList from '../Section/ProcessList';

const Process = () => {
  return (
    <FormLayout json={layout}>
      <TransactionType name="transactionType" />
      <ProcessList name="processList" />
    </FormLayout>
  );
};

export default Process;
