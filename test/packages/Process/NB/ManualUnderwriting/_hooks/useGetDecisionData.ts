import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from '../activity.config';

export default () => {
  const businessData = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace.businessData,
    shallowEqual
  );
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  return useMemo(() => {
    const caseCategory = lodash.get(taskDetail, 'caseCategory');
    const applicationNo = lodash.get(businessData, 'applicationNo');
    const policyId = lodash.get(businessData, 'policyId');
    const policyDecision = lodash.get(businessData, 'policyList[0].policyDecision', {});
    const policyCoverageList = lodash.get(businessData, 'policyList[0].coverageList', []);
    const clientInfoList = lodash.get(businessData, 'policyList[0].clientInfoList', []);
    const policyBasePremium = lodash.get(businessData, 'policyList[0].policyBasePremium');
    const policyLoadingPremium = lodash.get(businessData, 'policyList[0].policyLoadingPremium');
    const policyInstalmentPremiumWithTax = lodash.get(
      businessData,
      'policyList[0].policyInstalmentPremiumWithTax'
    );
    // const policyOrderCoerageList = lodash.orderBy(policyCoverageList, 'coverageNum');
    return {
      businessData,
      caseCategory,
      applicationNo,
      policyId,
      policyDecision,
      clientInfoList,
      policyBasePremium,
      policyLoadingPremium,
      policyInstalmentPremiumWithTax,
      policyOrderCoerageList: policyCoverageList,
      taskDetail,
    };
  }, [businessData]);
};
