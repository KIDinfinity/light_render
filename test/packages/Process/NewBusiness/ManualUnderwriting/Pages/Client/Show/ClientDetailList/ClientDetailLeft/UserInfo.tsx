import React from 'react';
import { useSelector } from 'dva';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import NewClientFlag from 'process/NewBusiness/ManualUnderwriting/_enum/NewClientFlag';

import ClientName from '../../../_component/ClientName';
import styles from './index.less';

export default ({clientId}: any) => {
  const newClientFlag = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.newClientFlag
  );

  return (
    <div className={styles.userInfo}>
      <span className={styles.name}>
        <ClientName clientId={clientId} />
      </span>
      {newClientFlag === NewClientFlag.New && (
        <span className={styles.status}>
          {formatMessageApi({
            Dropdown_IND_NewClientFlag: newClientFlag,
          })}
        </span>
      )}
    </div>
  );
};
