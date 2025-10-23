import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Context from './Context';

export default ({ caseDetail }: any) => (
  <CaseTaskDetail.Pending.Provider>
    <Context caseDetail={caseDetail} />
  </CaseTaskDetail.Pending.Provider>
);
