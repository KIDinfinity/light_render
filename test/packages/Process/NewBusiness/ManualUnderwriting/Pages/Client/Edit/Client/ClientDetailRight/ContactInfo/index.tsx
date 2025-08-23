import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formUtils } from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import Section from './Section';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import styles from './index.less';

export default ({ clientId }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.entities.clientMap?.[clientId]?.personalInfo?.customerRole
  );
  const isExistRole = !lodash.isEmpty(formUtils.queryValue(customerRole));
  return isExistRole ? (
    <div className={styles.addressContainer}>
      <div className={styles.infoWrap}>
        <AddressSection clientId={clientId} />
        <ContactSection clientId={clientId} />
        <Section clientId={clientId} />
      </div>
    </div>
  ) : null;
};
