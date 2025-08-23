import React, { useMemo } from 'react';
import { Icon } from 'antd';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CustomerRole from 'process/NewBusiness/Enum/CustomerRole';
import CustomerTypeEnum from 'process/NewBusiness/ManualUnderwriting/_enum/CustomerTypeEnum';

import styles from './deleteButton.less';

export default ({ clientId }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const customerType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType
  );
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole
  );
  const clientList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData?.processData?.clientInfoList
  );

  const isShow = useMemo(() => {
    const hasFamilyGroupIn = lodash.includes(customerRole, CustomerRole.HealthFamilySharingMember);
    const handle = () => {
      if (hasFamilyGroupIn) {
        return false;
      }
      if (clientList.length === 1) {
        return false;
      }
      return editable;
    };
    return tenant.region({
      [Region.MY]: () => {
        if (
          formUtils.queryValue(customerType) === CustomerTypeEnum.Company ||
          lodash.includes(formUtils.queryValue(customerRole), CustomerRole.PolicyOwner)
        ) {
          return false;
        }
        return handle();
      },
      notMatch: handle,
    });
  }, [editable, customerRole, customerType]);

  const deleteClient = () => {
    dispatch({
      type: `${NAMESPACE}/deleteCurrentClient`,
      payload: { clientId },
    });
    dispatch({
      type: `${NAMESPACE}/removeErrorLog`,
      payload: { paths: [clientId] },
    });
  };

  return isShow ? (
    <div className={styles.close} onClick={() => deleteClient()}>
      <Icon type="close" />
    </div>
  ) : null;
};
