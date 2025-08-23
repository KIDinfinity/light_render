import React from 'react';

import useGetSectionConfigWithRole from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';

import { localConfig } from '../../../_section/commonClientInfoField';
import ApplicationIdentity from './ApplicationIdentity';
import UserInfo from './UserInfo';
import DedupCheck from './DedupCheck';

// import QuestionnaireModel from './QuestionnaireModel';

import styles from './index.less';

export default ({clientId}: any) => {
  const config =  useGetSectionConfigWithRole({
    section: localConfig.section,
    localConfig,
    clientId,
    condition: 'proposal'
  });

  return (
    <div className={styles.clientDetailLeft}>
      <ApplicationIdentity clientId={clientId} config={config} />
      <UserInfo clientId={clientId} config={config} />
      <DedupCheck clientId={clientId} />
    </div>
  );
};

export const ClientDetailLeftOfAuthorisedSignatory = ({clientId}: any) => {
  const config =  useGetSectionConfigWithRole({
    section: localConfig.section,
    localConfig,
    clientId,
    condition: 'proposal'
  });

  return (
    <div className={styles.clientDetailLeft}>
      <ApplicationIdentity clientId={clientId} config={config} />
      <UserInfo clientId={clientId} config={config} />
    </div>
  );
}
