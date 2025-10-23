import React from 'react';
import Section from './Section';
import ContactSection from './ContactSection';
import styles from './index.less';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';

export default (props: any) => {
  const { clientId } = props;
  const customerRole = useSelector((state: any) =>
    lodash.get(state, `${NAMESPACE}.entities.clientMap.${clientId}.personalInfo.customerRole`)
  );
  const customerType = useSelector((state: any) =>
    lodash.get(state, `${NAMESPACE}.entities.clientMap.${clientId}.personalInfo.customerType`)
  );
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();

  const isShowSection =
    !lodash.isEmpty(formUtils.queryValue(customerRole)) &&
    (retrieveExistCorpFromLAToggle
      ? formUtils.queryValue(customerType) !== CustomerType.Entity
      : true);

  return (
    isShowSection && (
      <div className={styles.container}>
        <Section {...props} />
        <ContactSection {...props} />
      </div>
    )
  );
};
