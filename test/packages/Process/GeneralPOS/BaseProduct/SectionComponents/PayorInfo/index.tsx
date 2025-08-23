import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from 'process/GeneralPOS/BaseProduct/page/UserInfo/roleBox.less';
import Item from './Item';
import classNames from 'classnames';
import ShowButton from 'process/GeneralPOS/common/RoleQuestionnaire/ShowButton';
import SystemClientID from 'process/GeneralPOS/common/SystemClientID';
import { tenant } from '@/components/Tenant';
const PayorInfo = ({ id }: { id: string }) => {
  const { clientInfoList, clientContactList } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};

  const { name, roles } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortRoleByClientId?.[id]
    ) || {};

  const info = lodash.find(clientInfoList, (item) => item.clientId === id) || {};
  const contactInfo = lodash.find(clientContactList, (item) => item.clientId === id) || {};
  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );

  const data = {
    ...info,
    ...contactInfo,
  };

  return (
    <div className={classNames(styles.roleInfo, 'pos-payor-info')}>
      <div className={classNames(styles.nameRole, styles.fixSpace)}>
        <div>
          <div>
            <SystemClientID
              value={id}
              sourceSystem={tenant.isTH() || tenant.isMY() ? sourceSystem || 'LA' : 'LA'}
            />
          </div>
          <div className={classNames(styles.userName)}>{name}</div>
          <div className={classNames(styles.roleList)}>
            {lodash
              .chain(roles)
              .map((roleItem: any) => (
                <div className={styles.role} key={roleItem}>
                  <div className={styles.flag} />
                  {formatMessageApi({ Dropdown_CLM_CustomerRole: roleItem })}
                </div>
              ))
              .value()}
          </div>
        </div>
        <ShowButton clientId={id} />
      </div>
      <div className={styles.splitLine} />
      <div className={styles.info}>
        <Item info={data} />
      </div>
    </div>
  );
};

export default PayorInfo;
