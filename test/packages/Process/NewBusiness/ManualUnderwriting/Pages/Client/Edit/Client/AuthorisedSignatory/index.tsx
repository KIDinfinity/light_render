import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import CustomerRole from 'basic/enum/CustomerRole';
import BooleanEnum from 'basic/enum/BooleanEnum';

import { ClientDetailLeftOfAuthorisedSignatory } from '../ClientDetailLeft';
import { ClientDetailRightOfAuthorisedSignatory } from '../ClientDetailRight';

import styles from './index.less';
import useGetIsCustomerEntity from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetIsCustomerEntity';

export default ({ clientId }: any) => {
  const { roleDicts, customerType, customerRole, authorisedSignatoryClientId } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => {
      return {
        roleDicts: modelnamepsace.roleDicts,
        customerType:
          modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerType,
        customerRole:
          modelnamepsace.modalData.entities?.clientMap?.[clientId]?.personalInfo?.customerRole,
        authorisedSignatoryClientId: modelnamepsace.authorisedSignatoryClientId,
      };
    },
    shallowEqual
  );

  const isEntity = useGetIsCustomerEntity({ customerType: formUtils.queryValue(customerType) });
  const isAuthorisedSignatoryDispay =
    lodash.find(roleDicts, { dictCode: CustomerRole.AuthorisedSignatory })?.display ===
    BooleanEnum.Yes;
  const hasOwner = lodash.includes(formUtils.queryValue(customerRole), CustomerRole.PolicyOwner);
  const isShow = isAuthorisedSignatoryDispay && isEntity && hasOwner && authorisedSignatoryClientId;

  return isShow ? (
    <div className={styles.authorisedSignatory}>
      <ClientDetailLeftOfAuthorisedSignatory clientId={authorisedSignatoryClientId} />
      <ClientDetailRightOfAuthorisedSignatory clientId={authorisedSignatoryClientId} />
    </div>
  ) : null;
};
