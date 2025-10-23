import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import styles from '../../index.less';
import ClientSelectItem from './ClientSelectItem';
import useFilterFamilyGroupClientList from '../../_hooks/useFilterFamilyGroupClientList';
import CustomerRole from 'basic/enum/CustomerRole';

export default ({ editMode }) => {
  const list = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.clientInfoList,
    shallowEqual
  );
  const clientMap = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.entities?.clientMap;
  }, shallowEqual);
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const filteredList = useFilterFamilyGroupClientList(list);
  const disPlayList = useMemo(() => {
    const clientList = lodash.filter(
      filteredList,
      (id) =>
        !lodash.includes(
          [
            CustomerRole.AuthorisedSignatory,
            CustomerRole.UBO,
            CustomerRole.ControllingPerson,
            CustomerRole.Director,
          ],
          clientMap?.[id]?.personalInfo?.customerRole?.[0]
        )
    );
    if (expandedClientId) {
      return lodash.filter(clientList, (item) => item !== expandedClientId);
    }
    return lodash.slice(clientList, 2);
  }, [filteredList, expandedClientId, clientMap]);

  return lodash.size(disPlayList) > 0 ? (
    <div className={styles.clientSelectList}>
      {lodash.map(disPlayList, (clientId: string) => {
        return <ClientSelectItem clientId={clientId} key={clientId} editMode={editMode} />;
      })}
    </div>
  ) : null;
};
