import React from 'react';
import Action from './Action';
import ChequeInformationField from 'process/NB/Share/Components/Cheque/ChequeInformationField/MW';
import ChequeInformationTable from 'process/NB/Share/Components/Cheque/ChequeInformationTable/MW';
import useSubcribeChequeShareChequeUpdate from 'process/NB/Share/hooks/useSubcribeChequeShareChequeUpdate';
import Layout from './Layout';

const Cheque = ({useHandleRefreshCallback}: any) => {
  useSubcribeChequeShareChequeUpdate();
  return (
    <Layout>
      <Action useHandleRefreshCallback={useHandleRefreshCallback}/>
      <ChequeInformationField />
      <ChequeInformationTable />
    </Layout>
  );
};

Cheque.displayName = 'Cheque';

export default Cheque;
