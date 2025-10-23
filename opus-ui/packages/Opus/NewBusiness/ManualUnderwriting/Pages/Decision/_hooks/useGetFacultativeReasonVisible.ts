import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetFacultativeOptionVisible from './useGetFacultativeOptionVisible';
import lodash from 'lodash';
import { useGetCoverageList } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
import { useMemo } from 'react';
import useProceedGetFacultativeInfo from './useProceedGetFacultativeInfo';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';
import useGetCompanyCode from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCompanyCode';

export default () => {
  const facultativeOptionVisible = useGetFacultativeOptionVisible();
  const companyCode = useGetCompanyCode();
  const coverageList = useGetCoverageList();
  const dbCoverageList = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace?.businessData?.policyList?.[0]?.coverageList || [];
  });
  const { caseCategory, activityKey } = useSelector(
    ({ processTask }: any) => processTask.getTask,
    shallowEqual
  );

  const hasSelectedFacultativeReason = lodash.some(
    coverageList,
    (coverageItem: any) => !!coverageItem?.coverageDecision?.facultativeReason
  );
  const dbHasSelectedFacultativeReason = lodash.some(
    dbCoverageList,
    (coverageItem: any) => !!coverageItem?.coverageDecision?.facultativeReason
  );

  const isPostQC =
    caseCategory === CaseCategory.BP_NB_CTG003 && activityKey === TaskDefKey.BP_NB_ACT008;

  const isProceedGetFacultativeInfo = useProceedGetFacultativeInfo();

  return useMemo(() => {
    if (isProceedGetFacultativeInfo) {
      return facultativeOptionVisible && companyCode === '3';
    } else {
      if (isPostQC) {
        return (
          facultativeOptionVisible &&
          companyCode === '3' &&
          (hasSelectedFacultativeReason || dbHasSelectedFacultativeReason)
        );
      } else {
        return facultativeOptionVisible && companyCode === '3' && hasSelectedFacultativeReason;
      }
    }
  }, [
    isProceedGetFacultativeInfo,
    facultativeOptionVisible,
    companyCode,
    hasSelectedFacultativeReason,
    dbHasSelectedFacultativeReason,
    isPostQC,
  ]);
};
