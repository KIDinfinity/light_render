import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import bpm, { OpusBPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import { NAMESPACE } from './activity.config';
import ManualUnderwriting from './index';
import NamespaceProvider from 'basic/components/NamespaceProvider';
import useGetActionButtonConfig from './useGetActionButtonConfig';
import convert_businessDataBEToFE from 'opus/Utils/convert_businessDataBEToFE';
import { tenant } from '@/components/Tenant';
import MCSubscribeRefreshPremium from './MCSubscribeRefreshPremium';

const Entry = ({ taskDetail, businessData }: any) => {
  const NewBusiness = convert_businessDataBEToFE({ requestData: businessData }, tenant.region());

  const actionConfig = useGetActionButtonConfig();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setCurrencyEditable`,
      payload: {
        currencyEditable: false,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  bpm.setActionConfig(actionConfig);
  bpm.setClaimDataSelector((state: any) => state.manualUnderwriting);
  MCSubscribeRefreshPremium({
    taskDetail,
  });
  return (
    <NamespaceProvider namespace={NAMESPACE}>
      <OpusBPM>
        <OpusBPM.Header>
          <OpusBPM.HeaderPolicyId>{businessData?.policyId}</OpusBPM.HeaderPolicyId>
        </OpusBPM.Header>
        {NewBusiness && <ManualUnderwriting taskDetail={taskDetail} businessData={NewBusiness} />}
        <EntryErrorsUpdate />
      </OpusBPM>
    </NamespaceProvider>
  );
};

export default Entry;
