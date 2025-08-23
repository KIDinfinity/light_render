import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Icon } from 'antd';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import AddressItem from './AddressItem';
import AddressAdd from './AddressAdd';
import styles from './index.less';

export default ({ clientId }: any) => {
  const AddressInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.addressInfoList
  );
  const addressInfoMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.entities?.addressInfoMap
  );
  const filterAddressInfoList = useMemo(() => {
    return lodash
      .chain(AddressInfoList)
      .filter((id) => {
        const currentAddressItem = addressInfoMap[id];
        return currentAddressItem?.addrType !== 'US';
      })
      .value();
  }, [AddressInfoList]);

  return (
    <div className={styles.tableSection}>
      <div className={styles.title}>
        <div className={styles.icon}>
          <Icon type="contacts" />
        </div>
        <div>Address Info</div>
      </div>
      {filterAddressInfoList?.map((id: string) => {
        return <AddressItem clientId={clientId} id={id} key={id} />;
      })}
      <AddressAdd clientId={clientId} />
    </div>
  );
};
