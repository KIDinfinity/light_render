import React from 'react';
import Action from './Action';
import ChequeInformationField from 'process/NB/Share/Components/Cheque/ChequeInformationField/MW';
import ChequeInformationFieldEdit from 'process/NB/Share/Components/Cheque/ChequeInformationField';
import ChequeInformationTable from 'process/NB/Share/Components/Cheque/ChequeInformationTable/MW';
import useSubcribeChequeShareChequeUpdate from 'process/NB/Share/hooks/useSubcribeChequeShareChequeUpdate';
import useGetChequeEditStatus from 'process/NB/Share/hooks/useGetChequeEditStatus';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';
import useGetCurrentPolicyCheuqeData from 'process/NB/Share/hooks/useGetCurrentPolicyCheuqeData';
import useGetNamespace from 'basic/components/NamespaceProvider/hooks/useGetNamespace';
import useJudgeChequeNoDuplicateWarningDisplay from 'process/NB/Share/hooks/useJudgeChequeNoDuplicateWarningDisplay';

import Layout from './Layout';

const Cheque = ({ useHandleRefreshCallback }: any) => {
  useSubcribeChequeShareChequeUpdate();
  const chequeEditStatus = useGetChequeEditStatus();
  const data = useGetCurrentPolicyCheuqeData();
  const nameSpace = useGetNamespace();
  const displayWarning = useJudgeChequeNoDuplicateWarningDisplay();
  return (
    <Layout>
      <Action useHandleRefreshCallback={useHandleRefreshCallback} />
      {chequeEditStatus === ChequeEditStatus.Editing ? (
        <ChequeInformationFieldEdit
          data={data}
          nameSpace={nameSpace}
          displayWarning={displayWarning}
        />
      ) : (
        <ChequeInformationField displayWarning={displayWarning} />
      )}
      <ChequeInformationTable />
    </Layout>
  );
};

Cheque.displayName = 'Cheque';

export default Cheque;
