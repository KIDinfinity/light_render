import React, { useMemo } from 'react';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { NewClientFlag } from 'process/NewBusiness/ManualUnderwriting/_enum';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import styles from './index.less';

const IdentityItem = ({ labelId, clientId, field, config }: any) => {
  const value = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.[field]
  );

  return lodash.some(config, (item) => item.field === field) ? (
    <div className={classNames(styles.identityItem, styles.container)}>
      <span className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Individual: labelId,
        })}
      </span>
      <Tooltip title={value} className={styles.info}>
        {value}
      </Tooltip>
    </div>
  ) : null;
};

export default ({ clientId, config }: any) => {
  const regionCode = tenant.region();
  const clientInfo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]
  );
  const showIsNewClient = useMemo(
    () => regionCode === Region.TH && clientInfo?.newClientFlag === NewClientFlag.New,
    [clientInfo, regionCode]
  );

  return (
    <div className={styles.applicationIdentity}>
      {showIsNewClient && (
        <span className={styles.status}>
          {formatMessageApi({
            Dropdown_IND_NewClientFlag: clientInfo?.newClientFlag,
          })}
        </span>
      )}
      <IdentityItem clientId={clientId} field="ccrClientId" labelId="CCRClientID" config={config} />
      <IdentityItem clientId={clientId} field="laClientId" labelId="LAClientID" config={config} />
    </div>
  );
};
