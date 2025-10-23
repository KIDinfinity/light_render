import React, { useEffect } from 'react';
import bpm, { OpusBPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import { NAMESPACE } from './activity.config';
import { useDispatch } from 'dva';
import ProcessIndex from '../BaseProduct/index';
import NamespaceProvider from 'basic/components/NamespaceProvider';
import actionConfig from './action.config';

const Entry = ({ taskDetail, businessData }: any) => {
  bpm.setActionConfig(actionConfig);

  return (
    <NamespaceProvider namespace={NAMESPACE}>
      <OpusBPM>
        <OpusBPM.Header />
        {/* {businessData && <ProcessIndex taskDetail={taskDetail} businessData={businessData} />} */}
        <EntryErrorsUpdate />
      </OpusBPM>
    </NamespaceProvider>
  );
};

export default Entry;
