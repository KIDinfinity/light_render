import React from 'react';
import SubRequestClientsDetail from '../index';

const IdentityInfo = ({ item, columnList, policy }: any) => {
  return <SubRequestClientsDetail item={item} policy={policy} columnList={columnList} />;
};

IdentityInfo.displayName = 'identityInfo';

export default IdentityInfo;
