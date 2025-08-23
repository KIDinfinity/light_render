import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Auth from './Auth';

export default () => (
  <CaseTaskDetail.Integration.Provider>
    <Auth />
  </CaseTaskDetail.Integration.Provider>
);
