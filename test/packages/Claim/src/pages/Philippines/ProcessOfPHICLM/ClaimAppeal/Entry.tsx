import React from 'react';
import bpm from 'bpm/pages/OWBEntrance';
import actionConfig from 'claim/pages/Philippines/ProcessOfPHICLM/ClaimAppeal/actionConfig';
import Claim from './index';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';

function Entry({ taskDetail, businessData }: any) {

  bpm.setActionConfig(actionConfig);

  return (
    <>
      <Claim taskDetail={taskDetail} businessData={businessData} />
      <EntryErrorsUpdate />
    </>
  );
}

export default Entry;
