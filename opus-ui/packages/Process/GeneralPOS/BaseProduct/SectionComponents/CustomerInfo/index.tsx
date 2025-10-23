import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import Item from './Item';
import classNames from 'classnames';
import { tenant } from '@/components/Tenant';
import CustomerType from './CustomerType';
import ShowButton from 'process/GeneralPOS/common/RoleQuestionnaire/ShowButton';

const CustomerInfo = () => {
  const policyInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.policyInfo) ||
    {};

  const OwnerRoleList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientRole?.OwnerRoleList
    ) || {};

  const OtherRoleList =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.clientRole?.OtherRoleList
    ) || [];

  const mainPolicyId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.mainPolicyId
  );

  const clientId = lodash.find(
    policyInfo.policyOwnerList,
    (item) => item.policyId === mainPolicyId
  )?.clientId;

  const info = lodash.find(policyInfo.clientInfoList, (item) => item.clientId === clientId) || {};
  const contactInfo =
    lodash.find(policyInfo.clientContactList, (item) => item.clientId === clientId) || {};
  const clientContact =
    policyInfo?.policyDespatchAddressList?.find((item) => item?.policyId === mainPolicyId) || {};

  const otherData = tenant.isPH()
    ? {
        phoneNo: clientContact?.mobilePhoneNo,
        workNo: clientContact?.businessOfficeNo,
        homeNo: clientContact?.residenceTelNo,
        email: clientContact?.emailAddress,
      }
    : {};

  const data = {
    ...info,
    ...contactInfo,
    ...otherData,
  };
  return (
    <div className={styles.customerInfo}>
      <div
        className={classNames(styles.nameRole, {
          [styles.autoSpace]: OtherRoleList?.length > 1 && tenant.isTH(),
          [styles.fixSpace]: OtherRoleList?.length <= 1,
        })}
      >
        <div>
          <div className={styles.userName}>
            {[tenant.isPH() ? info?.title : '', info.firstName, info.middleName, info.surname]
              .filter((item) => item)
              .join(' ')}
          </div>
          <div className={styles.roleList}>
            {lodash
              .chain(OwnerRoleList)
              .map((roleItem: any) => (
                <div className={styles.role} key={roleItem}>
                  <div className={styles.flag} />
                  {formatMessageApi({ Dropdown_CLM_CustomerRole: roleItem })}
                </div>
              ))
              .value()}
          </div>
          <div className={styles.customerType}>
            {info.vip === '1' && <CustomerType customerType="VIP" />}
          </div>
        </div>
        <ShowButton clientId={clientId} />
      </div>
      <div className={styles.splitLine} />
      <div className={styles.info}>
        <Item info={data} />
      </div>
    </div>
  );
};

export default CustomerInfo;
