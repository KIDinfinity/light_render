import React, { useEffect } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useLoadFieldsCustomerTypeConfig from 'process/NB/CustomerIdentification/_hooks/useLoadFieldsCustomerTypeConfig';
import useLoadRegionalDefaultValueList from 'process/NB/CustomerIdentification/_hooks/useLoadRegionalDefaultValueList';
import useLoadRoleDropdown from 'process/NB/CustomerIdentification/_hooks/useLoadRoleDropdown';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DataPriority from 'enum/DataPriority';
import useHandleChangeDataPiorityCallback from 'basic/components/DataPriorityContainer/hooks/useHandleChangeDataPiorityCallback';
import { NAMESPACE } from './activity.config';
import Policy from './Policy';
import styles from './index.less';

export default () => {
  const claimProcessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData,
    shallowEqual
  );
  useLoadFieldsCustomerTypeConfig({
    atomGroupCode: 'BP_NB_CTG001_BP_NB_ACT004',
  });
  useLoadRegionalDefaultValueList();
  useLoadRoleDropdown();
  const handleChangePriority = useHandleChangeDataPiorityCallback();
  useEffect(() => {
    window.requestIdleCallback(() => {
      handleChangePriority(DataPriority.MEDIUM);
    });
  }, [handleChangePriority]);
  const dedupCheckResult = lodash.get(
    claimProcessData,
    'policyList[0].clientInfoList[0].dedupCheckResult'
  );
  return (
    <>
      {dedupCheckResult && (
        <div className={styles.title}>
          {formatMessageApi({ Dropdown_POL_DedupResult: dedupCheckResult })}
        </div>
      )}
      {lodash.map(claimProcessData?.policyList, (item: any) => (
        <Policy key={item.id} policy={item} />
      ))}
    </>
  );
};
