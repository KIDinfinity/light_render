import React from 'react';
import Modal from './Modal';
import Layout from './Layout';
import TransferPaymentField from './TransferPayment-Field/ReadOnly';
import TransferPaymentTable from './TransferPayment-Table';
import Actions from './Actions';

export default () => {
  return (
    <>
      <Modal>
        <Layout>
          <TransferPaymentField />
          <TransferPaymentTable />
          <Actions />
        </Layout>
      </Modal>
    </>
  );
};
