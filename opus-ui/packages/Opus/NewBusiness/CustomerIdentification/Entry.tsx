import React from 'react';
import bpm, { OpusBPM } from 'bpm/pages/OWBEntrance';
import actionConfig from './action.config';
import CustomerIdentification from './index';
import convert_businessDataBEToFE from 'opus/Utils/convert_businessDataBEToFE';
import { tenant } from '@/components/Tenant';

export default ({ taskDetail, businessData }: any) => {
  bpm.setActionConfig(actionConfig);
  const NewBusiness = convert_businessDataBEToFE({ requestData: businessData }, tenant.region());
  return (
    <OpusBPM>
      <OpusBPM.Header />
      {businessData && (
        <CustomerIdentification taskDetail={taskDetail} businessData={NewBusiness} />
      )}
    </OpusBPM>
  );
};
