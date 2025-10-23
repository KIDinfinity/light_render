import React from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import DirectorSection from './DirectorSection';
import ControlPersonSection from './ControlPersonSection';
import styles from './index.less';
import CustomerRole from 'basic/enum/CustomerRole';
import CustomerType from 'opus/NewBusiness/Enum/CustomerType';
import useRetrieveExistCorpFromLAToggle from '../../../../_hooks/useRetrieveExistCorpFromLAToggle';
import useDisplayUBOInfoFlag from '../../../../_hooks/useDisplayUBOInfoFlag';

export default ({ clientId }: any) => {
  const customerRole = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.entities.clientMap[clientId].personalInfo.customerRole
  );
  const customerType = useSelector(({ [NAMESPACE]: modelnamespace }: any) =>
    formUtils.queryValue(modelnamespace.entities.clientMap[clientId].personalInfo.customerType)
  );
  const expandedClientId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.expandedClientId
  );
  const expand = !!expandedClientId;
  const retrieveExistCorpFromLAToggle = useRetrieveExistCorpFromLAToggle();
  const displayUBOInfoFlag = useDisplayUBOInfoFlag();

  const isExistRole = lodash.includes(formUtils.queryValue(customerRole), CustomerRole.Payor);
  const isShowSection =
    customerType === CustomerType.Entity &&
    isExistRole &&
    expand &&
    retrieveExistCorpFromLAToggle &&
    displayUBOInfoFlag;

  return isShowSection ? (
    <div className={styles.sectionContainer}>
      <div className={styles.infoWrap}>
        <DirectorSection clientId={clientId} />
        <ControlPersonSection clientId={clientId} />
      </div>
    </div>
  ) : null;
};
