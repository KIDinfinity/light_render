import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import classnames from 'classnames';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

import ClientSelectItem from './ClientSelectItem';
import AddButton from './addButton';
import styles from '../../index.less';
import CustomerRole from 'basic/enum/CustomerRole';
import { formUtils } from 'basic/components/Form';

export default () => {
  const list = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.processData?.clientInfoList,
    shallowEqual
  );
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.entities?.clientMap,
    shallowEqual
  );
  const editingClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.editingClientId
  );

  const disPlayList = useMemo(() => {
    const clientList = lodash.filter(
      list,
      (id) =>
        !lodash.includes(
          [
            CustomerRole.AuthorisedSignatory,
            CustomerRole.UBO,
            CustomerRole.ControllingPerson,
            CustomerRole.Director,
          ],
          formUtils.queryValue(clientMap?.[id]?.personalInfo?.customerRole)?.[0]
        )
    );
    if (editingClientId) {
      return lodash.filter(clientList, (item) => item !== editingClientId);
    }
    return lodash.slice(clientList, 1);
  }, [list, editingClientId, clientMap]);

  return (
    <div className={classnames(styles.clientSelectList, styles.edit)}>
      {lodash.map(disPlayList, (clientId: string) => {
        return <ClientSelectItem clientId={clientId} key={clientId} />;
      })}
      <AddButton />
    </div>
  );
};
