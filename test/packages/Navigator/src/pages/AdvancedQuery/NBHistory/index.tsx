import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import Table from './Table';

export default (props: any) => (
  <CaseTaskDetail.Consumer {...props}>
    <Table />
  </CaseTaskDetail.Consumer>
);
