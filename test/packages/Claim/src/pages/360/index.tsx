import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import C360 from './C360';

export default ({ props }: any) => (
  <CaseTaskDetail.Component360.Provider {...props}>
    <C360 />
  </CaseTaskDetail.Component360.Provider>
);
