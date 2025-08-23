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
import Name from './Name';

const InsuredInfo = ({ id }: { id: string }) => {
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
    <div className={classNames(styles.roleInfo, 'pos-insured-info')}>
      <div className={classNames(styles.nameRole, styles.fixSpace)}>
        <div>
          <div>
            <SystemClientID
              value={id}
              sourceSystem={tenant.isTH() || tenant.isMY() ? sourceSystem || 'LA' : 'LA'}
            />
          </div>
          <div className={classNames(styles.userName)}>
            {lodash.isEmpty(name) ? <Name name={name} clientId={id} roles={roles} /> : name}
          </div>
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
        <Item info={{ ...data, roles, clientId: id }} />
      </div>
    </div>
  );
};

export default InsuredInfo;
