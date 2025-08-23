import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import NBHistory from './NBHistory';
import CaseContainer from 'basic/components/CaseContainer';

export default (props: any) => {
  return (
    <CaseContainer>
      <CaseTaskDetail.Consumer {...props}>
        <NBHistory />
      </CaseTaskDetail.Consumer>
    </CaseContainer>
  );
};
