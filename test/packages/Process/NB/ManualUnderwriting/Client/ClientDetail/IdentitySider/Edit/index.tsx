import React, { useMemo } from 'react';
import lodash from 'lodash';
import ApplicationIdentity from 'process/NB/ManualUnderwriting/Client/ClientDetail/IdentitySider/Show/ApplicationIdentity';
import usePOSetRelationOfProposerSelf from 'process/NB/ManualUnderwriting/_hooks/usePOSetRelationOfProposerSelf';
import UserInfo from './UserInfo';
import Role from './Role';
import Relationship from './Relationship';
import CustomerType from './CustomerType';
import DedupCheckButton from './DedupCheck';

export default ({ item, isSubCard }: any) => {
  usePOSetRelationOfProposerSelf({ id: item?.id });
  const roleFormFields = useMemo(() => {
    const customerRole = lodash
      .chain(item)
      .get('roleList', [])
      .map((i) => {
        return lodash.get(i, 'customerRole');
      })
      .filter((i) => !!i)
      .value();
    return {
      customerRole,
    };
  }, [item]);
  return (
    <>
      <ApplicationIdentity item={item} id={item?.id} />
      <UserInfo item={item} id={item?.id} />
      <Role roleFormFields={roleFormFields} id={item?.id} isSubCard={isSubCard} />
      <Relationship item={item} id={item?.id} />
      <CustomerType item={item} id={item?.id} />
      <DedupCheckButton id={item?.id} />
    </>
  );
};
