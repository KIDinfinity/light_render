import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import HeaderInfo from './HeaderInfo';
import Provider from 'bpm/pages/OWBEntrance/Context/Provider';

export default (props: any) => (
  <Provider  {...props}>
    <CaseTaskDetail.Consumer {...props}>
      <HeaderInfo />
    </CaseTaskDetail.Consumer>
  </Provider>
);
