import React from 'react';
import classnames from 'classnames';

import useGetSectionConfigWithRole from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetSectionConfigWithRole';

import { localConfig } from '../../../_section/commonClientInfoField';
import ApplicationIdentity from './ApplicationIdentity';
import UserInfo from './UserInfo';
import Role from './Role';
import CustomerType from './CustomerType';
import Relationship from './Relationship';
import QuestionnaireModel from './QuestionnaireModel';
import ChildRelationshipType from './ChildRelationshipType';

import styles from './index.less';

export default ({clientId}: any) => {
  const config =  useGetSectionConfigWithRole({
    section: localConfig.section,
    localConfig,
    clientId,
  });

  return (
    <div className={styles.clientDetailLeft}>
      <ApplicationIdentity clientId={clientId} config={config} />
      <UserInfo clientId={clientId} />
      <Role clientId={clientId}/>
      <CustomerType clientId={clientId}/>
      <Relationship clientId={clientId} config={config}/>
      <ChildRelationshipType clientId={clientId} config={config}/>
      <QuestionnaireModel clientId={clientId}/>
    </div>
  );
};

export const ClientDetailLeftOfAuthorisedSignatory = ({clientId}: any) => {
  const config =  useGetSectionConfigWithRole({
    section: localConfig.section,
    localConfig,
    clientId,
  });

  return (
    <div className={classnames(styles.clientDetailLeft, styles.abridged)}>
      <ApplicationIdentity clientId={clientId} config={config} />
      <UserInfo clientId={clientId} />
      <Role clientId={clientId}/>
      <CustomerType clientId={clientId}/>
      <ChildRelationshipType clientId={clientId} config={config}/>
      <QuestionnaireModel clientId={clientId}/>
    </div>
  );
}
