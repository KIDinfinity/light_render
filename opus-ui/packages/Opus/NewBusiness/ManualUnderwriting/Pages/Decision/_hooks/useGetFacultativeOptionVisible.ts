import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { useMemo } from 'react';
import useGetPolicyDecision from './useGetPolicyDecision';
import PolicyLevelDecision from 'opus/NewBusiness/Enum/PolicyLevelDecision';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { useGetCoverageList } from 'opus/NewBusiness/ManualUnderwriting/_hooks';
import useProceedGetFacultativeInfo from './useProceedGetFacultativeInfo';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';

export default () => {
  const coverageList = useGetCoverageList();
  const dbCoverageList = useSelector(({ [NAMESPACE]: modelnamespace }: any) => {
    return modelnamespace?.businessData?.policyList?.[0]?.coverageList || [];
  });
  const policyDecision = useGetPolicyDecision();
  const facultativeInfo = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => {
    return modelnamepsace.facultativeInfo;
  }, shallowEqual);
  const { caseCategory, activityKey } = useSelector(
    ({ processTask }: any) => processTask.getTask,
    shallowEqual
  );

  const isProceedGetFacultativeInfo = useProceedGetFacultativeInfo();
  const isPostQC =
    caseCategory === CaseCategory.BP_NB_CTG003 && activityKey === TaskDefKey.BP_NB_ACT008;

  const decisionCode = formUtils.queryValue(policyDecision?.decisionCode);

  const hasSelectedFacultativeOption = lodash.some(
    coverageList,
    (coverageItem: any) => !!coverageItem?.coverageDecision?.facultativePackageCode
  );
  const dbHasSelectedFacultativeOption = lodash.some(
    dbCoverageList,
    (coverageItem: any) => !!coverageItem?.coverageDecision?.facultativePackageCode
  );

  const hasDisplayFlag = lodash.some(
    facultativeInfo,
    (info: { displayFlag: boolean }) => info?.displayFlag === true
  );

  return useMemo(() => {
    if (isProceedGetFacultativeInfo) {
      return decisionCode === PolicyLevelDecision.Approve && hasDisplayFlag;
    } else {
      if (isPostQC) {
        return (
          decisionCode === PolicyLevelDecision.Approve &&
          (hasSelectedFacultativeOption || dbHasSelectedFacultativeOption)
        );
      } else {
        return decisionCode === PolicyLevelDecision.Approve && hasSelectedFacultativeOption;
      }
    }
  }, [
    decisionCode,
    hasDisplayFlag,
    hasSelectedFacultativeOption,
    dbHasSelectedFacultativeOption,
    isProceedGetFacultativeInfo,
    isPostQC,
  ]);
};
