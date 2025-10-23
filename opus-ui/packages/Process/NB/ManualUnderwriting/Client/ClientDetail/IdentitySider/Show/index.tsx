import React from 'react';
import { tenant } from '@/components/Tenant';
import QuestionnaireModel from 'process/NB/ManualUnderwriting/QuestionnaireModel';
import ApplicationIdentity from './ApplicationIdentity';
import Relationship from './Relationship';
import Role from './Role';
import CustomerType from './CustomerType';
import UserInfo from './UserInfo';
import Layout from 'process/NB/ManualUnderwriting/Client/ClientDetail/IdentitySider/Layout';
import useGetCustomerType from 'process/NB/hooks/useGetCustomerType';

const IdentitySider = ({ item, mode, isSubCard }: any) => {
  const regionCode = tenant.region();

  return (
    <Layout region={regionCode} customerType={useGetCustomerType(item)} isSubCard={isSubCard}>
      <ApplicationIdentity id={item?.id} mode={mode} />
      <UserInfo item={item} />
      <Role item={item} />
      <CustomerType item={item} />
      <QuestionnaireModel
        id={item?.id}
        identityNo={item?.identityNo}
        identityType={item?.identityType}
        clientId={item?.smartClientId}
      />
      {!isSubCard && <Relationship id={item?.id} />}
    </Layout>
  );
};

export default IdentitySider;
