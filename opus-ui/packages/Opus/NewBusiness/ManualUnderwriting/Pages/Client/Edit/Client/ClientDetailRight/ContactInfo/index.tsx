import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from './Section';
import AddressSection from './AddressSection';
import ContactSection from './ContactSection';
import styles from './index.less';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';

export default ({ clientId }: any) => {
  const customerRole = useSelector((state: any) =>
    lodash.get(
      state,
      `${NAMESPACE}.modalData.entities.clientMap.${clientId}.personalInfo.customerRole`
    )
  );
  const customerType = useSelector((state: any) =>
    lodash.get(
      state,
      `${NAMESPACE}.modalData.entities.clientMap.${clientId}.personalInfo.customerType`
    )
  );
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();

  const isShowSection =
    !lodash.isEmpty(formUtils.queryValue(customerRole)) &&
    (retrieveExistCorpFromLAToggle
      ? formUtils.queryValue(customerType) !== CustomerType.Entity
      : true);

  return isShowSection ? (
    <div className={styles.addressContainer}>
      <div className={styles.infoWrap}>
        <AddressSection clientId={clientId} />
        <ContactSection clientId={clientId} />
        <Section clientId={clientId} />
      </div>
    </div>
  ) : null;
};
