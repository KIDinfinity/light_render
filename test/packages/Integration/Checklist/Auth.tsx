import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import IntegrationChecklist from './integrationChecklist';

const Auth = ({ children, localTaskDetail, remoteTaskDetail }: any) => {
  return (
    <>
      {React.cloneElement(children, {
        taskDetail: localTaskDetail || remoteTaskDetail,
      })}
    </>
  );
};

export default () => (
  <CaseTaskDetail.Integration.Consumer>
    <Auth>
      <IntegrationChecklist />
    </Auth>
  </CaseTaskDetail.Integration.Consumer>
);
