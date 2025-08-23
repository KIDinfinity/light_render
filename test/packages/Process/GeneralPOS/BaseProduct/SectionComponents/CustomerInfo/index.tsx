import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from 'process/GeneralPOS/BaseProduct/page/UserInfo/roleBox.less';
import Item from './Item';
import classNames from 'classnames';
import { tenant } from '@/components/Tenant';
import CustomerType from './CustomerType';
import ShowButton from 'process/GeneralPOS/common/RoleQuestionnaire/ShowButton';
import SystemClientID from 'process/GeneralPOS/common/SystemClientID';
import Name from './Name';

const CustomerInfo = ({ id }: { id: string }) => {
  const {
    clientInfoList = [],
    policyInfoList = [],
    clientContactList = [],
    policyDespatchAddressList = [],
  } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo
  ) || {};

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );
  const sourceSystem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.sourceSystem
  );
  const { name, roles } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.sortRoleByClientId?.[id]
    ) || {};

  const clientInfo = lodash.find(clientInfoList, { clientId: id }) || {};
  const contactInfo = lodash.find(clientContactList, { clientId: id }) || {};

  const despatchAddress = lodash.find(policyDespatchAddressList, { clientId: id }) || {};

  const data = {
    ...clientInfo,
    ...contactInfo,
    ...(tenant.isPH() && !lodash.isEmpty(despatchAddress)
      ? {
          phoneNo: despatchAddress?.mobilePhoneNo,
          workNo: despatchAddress?.businessOfficeNo,
          homeNo: despatchAddress?.residenceTelNo,
          email: despatchAddress?.emailAddress,
        }
      : {}),
  };

  const ownerFullName =
    lodash.chain(policyInfoList).find({ policyId: mainPolicyId }).get('ownerFullName').value() ||
    '';

  return (
    <div className={classNames(styles.roleInfo, 'pos-owner-info')}>
      <div
        className={classNames(styles.nameRole, {
          [styles.fixSpace]: true,
        })}
      >
        <div>
          <div>
            <SystemClientID
              value={id}
              sourceSystem={tenant.isTH() || tenant.isMY() ? sourceSystem || 'LA' : 'LA'}
            />
          </div>
          <div>
            <div className={classNames(styles.userName)}>
              {lodash.isEmpty(name || ownerFullName) ? (
                <Name name={name || ownerFullName} clientId={id} roles={roles} />
              ) : (
                name || ownerFullName
              )}
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
            <div className={styles.customerType}>
              {clientInfo.vip === '1' && <CustomerType customerType="VIP" />}
            </div>
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

export default CustomerInfo;
