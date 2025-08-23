import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import ClientSelectItem from './ClientSelectItem';
import AddButton from './addButton';
import styles from '../../index.less';

export default () => {
  const list = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.processData?.clientInfoList,
    shallowEqual
  );
  const authorisedSignatoryClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.authorisedSignatoryClientId
  );

  const editingClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.editingClientId
  );
  const disPlayList = useMemo(() => {
    const clientList = lodash.filter(list, (id) => id !== authorisedSignatoryClientId);
    if (editingClientId) {
      return lodash.filter(clientList, (item) => item !== editingClientId);
    }
    return lodash.slice(clientList, 1);
  }, [list, editingClientId, authorisedSignatoryClientId]);

  return (
    <div className={classnames(styles.clientSelectList, styles.edit)}>
      {lodash.map(disPlayList, (clientId: string) => {
        return <ClientSelectItem clientId={clientId} key={clientId} />;
      })}
      <AddButton />
    </div>
  );
};
