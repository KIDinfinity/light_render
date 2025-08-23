import { useMemo } from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default () => {
  const planInfoData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.planInfoData,
    shallowEqual
  );
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.processData?.coverageList,
    shallowEqual
  );

  // const clientInfoList = useSelector(
  //   ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.clientInfoList,
  //   shallowEqual
  // );
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  return useMemo(() => {
    const caseCategory = lodash.get(taskDetail, 'caseCategory');
    const applicationNo = lodash.get(planInfoData, 'applicationNo');
    const policyId = lodash.get(planInfoData, 'policyId');
    const policyBasePremium = lodash.get(planInfoData, 'policyBasePremium');
    const policyLoadingPremium = lodash.get(planInfoData, 'policyLoadingPremium');
    const policyInstalmentPremiumWithTax = lodash.get(
      planInfoData,
      'policyInstalmentPremiumWithTax'
    );
    const policyOrderCoerageList = lodash.orderBy(coverageList, 'coverageNum');
    return {
      caseCategory,
      applicationNo,
      policyId,
      clientInfoList: [],
      policyBasePremium,
      policyLoadingPremium,
      policyInstalmentPremiumWithTax,
      policyOrderCoerageList,
      taskDetail,
    };
  }, [planInfoData, coverageList, taskDetail]);
};
