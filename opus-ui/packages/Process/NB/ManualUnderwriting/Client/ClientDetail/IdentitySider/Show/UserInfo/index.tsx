import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import NewClientFlag from 'process/NB/ManualUnderwriting/Enum/NewClientFlag';
import ShortcutOf360 from 'basic/components/ShortcutOf360';
import useGetFullNameByClientInfo from 'process/NB/ManualUnderwriting/_hooks/useGetFullNameByClientInfo';
import styles from './index.less';

const UserInfo = ({ item }: any) => {
  const name = useGetFullNameByClientInfo({
    clientInfo: item,
  });

  return (
    <div className={styles.userInfo}>
      <span className={styles.name}>
        <ShortcutOf360
          activeClientId={item?.systemClientId}
          activeCustomerType={lodash
            .map(item?.roleList, (role: any) => role?.customerRole)
            ?.join(',')}
        >
          {name}
        </ShortcutOf360>
      </span>
      {item?.newClientFlag === NewClientFlag.New && (
        <span className={styles.status}>
          {formatMessageApi({
            Dropdown_IND_NewClientFlag: item?.newClientFlag,
          })}
        </span>
      )}
    </div>
  );
};

UserInfo.displayName = 'userInfo';

export default UserInfo;
