import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Auth from './Auth';

export default () => (
  <CaseTaskDetail.Pending.Provider>
    <Auth />
  </CaseTaskDetail.Pending.Provider>
);
