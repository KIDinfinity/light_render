import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import CaseDetail from './CaseDetail';

export default (props: any) => { 
  return (
    <CaseTaskDetail.Consumer {...props}>
      <CaseDetail {...props}/>
    </CaseTaskDetail.Consumer>
  );
  
}