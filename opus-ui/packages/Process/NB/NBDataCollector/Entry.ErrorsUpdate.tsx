import React, { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetTotalFundList from 'process/NB/ManualUnderwriting/_hooks/useGetTotalFundList';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from './activity.config';
import bpm from 'bpm/pages/OWBEntrance';

const EntryErrorsUpdate = () => {
  const totalFundInfoList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) =>
        modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
      shallowEqual
    ) || [];
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData,
    shallowEqual
  );
  const totalFundAllocationList = useGetTotalFundList();
  const isRaneTotalFundAllocation = lodash.every(
    totalFundAllocationList,
    (item) => item?.total === 100
  );
  const errors = useMemo(() => {
    const formErrors = formUtils.getErrorArray(businessData);
    if (totalFundInfoList && totalFundInfoList?.length && !isRaneTotalFundAllocation) {
      formErrors.push('total fund allocation is not equal 100!');
    }
    return [...formErrors];
  }, [businessData, isRaneTotalFundAllocation, totalFundInfoList]);

  bpm.updateErrors({
    errors: errors,
  });
  return <></>;
};
export default EntryErrorsUpdate;
