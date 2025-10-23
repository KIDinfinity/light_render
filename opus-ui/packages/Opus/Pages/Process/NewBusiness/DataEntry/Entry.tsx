import React, { useEffect, useMemo } from 'react';
import bpm, { OpusBPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import { NAMESPACE } from './activity.config';
import { useDispatch, useSelector } from 'dva';
import ProcessIndex from './index';
import NamespaceProvider from 'basic/components/NamespaceProvider';
import actionConfig from './action.config';

const OpusHeaderComponent = () => {
  const policyId = useSelector((state: any) => state[NAMESPACE]?.processData?.policyId);
  console.log('policyId');
  return (
    <OpusBPM.Header>
      <OpusBPM.HeaderPolicyId>{policyId}</OpusBPM.HeaderPolicyId>
    </OpusBPM.Header>
  );
};

const Entry = ({ taskDetail, businessData }: any) => {
  bpm.setActionConfig(actionConfig);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/saveProcessData`,
      payload: { businessData },
    });
    dispatch({
      type: `${NAMESPACE}/getCountryList`,
    });

    dispatch({
      type: `${NAMESPACE}/getProductList`,
    });
  }, [businessData]);
  const policyId = useSelector((state: any) => state[NAMESPACE]?.processData?.policyId) || '';
  console.log('policyId____', policyId);
  return useMemo(() => {
    return (
      <NamespaceProvider namespace={NAMESPACE}>
        <OpusBPM>
          <OpusBPM.HeaderPolicyId>{policyId}</OpusBPM.HeaderPolicyId>
          {businessData && <ProcessIndex taskDetail={taskDetail} businessData={businessData} />}
          <EntryErrorsUpdate />
        </OpusBPM>
      </NamespaceProvider>
    );
  }, [policyId]);
};

export default Entry;
