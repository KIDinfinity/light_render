import React, { useMemo } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import Item from './Item';
import classNames from 'classnames';
import ShowButton from 'process/GeneralPOS/common/RoleQuestionnaire/ShowButton';

const CustomerInfo = () => {
  const { mainInsuredClientId, clientInfoList, policyClientRoleList, clientContactList } =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const info = lodash.find(clientInfoList, (item) => item.clientId === mainInsuredClientId) || {};
  const contactInfo =
    lodash.find(clientContactList, (item) => item.clientId === mainInsuredClientId) || {};

  const roles: any[] = useMemo(
    () =>
      lodash
        .chain(policyClientRoleList)
        .filter((item) => item.clientId === mainInsuredClientId && item?.policyId === mainPolicyId)
        .uniqBy('role')
        .value(),
    [mainInsuredClientId, mainPolicyId, policyClientRoleList]
  );

  return (
    <div className={styles.customerInfo}>
      <div className={classNames(styles.nameRole, styles.autoSpace)}>
        <div>
          <div className={styles.userName}>
            {[info.firstName, info.middleName, info.surname].filter((item) => item).join(' ')}
          </div>
          <div className={styles.roleList}>
            {lodash
              .chain(roles)
              .map((roleItem: any) => (
                <div className={styles.role} key={roleItem.customerRole}>
                  <div className={styles.flag} />
                  {formatMessageApi({ Dropdown_CLM_CustomerRole: roleItem.customerRole })}
                </div>
              ))
              .value()}
          </div>
        </div>
        <ShowButton clientId={mainInsuredClientId} />
      </div>
      <div className={styles.splitLine} />
      <div className={styles.info}>
        <Item info={info} contactInfo={contactInfo} />
      </div>
    </div>
  );
};

export default CustomerInfo;
