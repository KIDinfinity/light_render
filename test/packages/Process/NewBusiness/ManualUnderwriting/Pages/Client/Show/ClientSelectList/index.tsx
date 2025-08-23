import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from '../../index.less';
import ClientSelectItem from './ClientSelectItem';
import useFilterFamilyGroupClientList from '../../_hooks/useFilterFamilyGroupClientList';

export default () => {
  const list = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.clientInfoList,
    shallowEqual
  );
  const authorisedSignatoryClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.authorisedSignatoryClientId
  );
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const filteredList = useFilterFamilyGroupClientList(list)
  const disPlayList = useMemo(() => {
    const clientList = lodash.filter(filteredList, (id) => id !== authorisedSignatoryClientId);
    if (expandedClientId) {
      return lodash.filter(clientList, (item) => item !== expandedClientId);
    }
    return lodash.slice(clientList, 2);
  }, [filteredList, expandedClientId, authorisedSignatoryClientId]);

  return lodash.size(disPlayList) > 0 ? (
    <div className={styles.clientSelectList}>
      {lodash.map(disPlayList, (clientId: string) => {
        return <ClientSelectItem clientId={clientId} key={clientId} />;
      })}
    </div>
  ) : null;
};
