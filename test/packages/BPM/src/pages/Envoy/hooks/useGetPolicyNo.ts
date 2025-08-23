import { useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { formUtils } from 'basic/components/Form';
import { tenant, Region } from '@/components/Tenant';
import lodash from 'lodash';

export default ({ claimNo, policyNo }: any) => {
  const claimPayableListMap = useSelector(
    (state: any) => state?.HKCLMOfClaimAssessmentController?.claimEntities?.claimPayableListMap,
    shallowEqual
  );
  const policyNoInfo = useSelector((state: any) => ({
    policyNoInfo: lodash.get(state, `envoyController.policyNoInfo[${claimNo}]`),
    shallowEqual,
  }));
  const defaultPolicyId = useSelector(
    ({ HKCLMOfClaimAssessmentController }: any) =>
      HKCLMOfClaimAssessmentController?.claimProcessData?.insured?.policyId,
    shallowEqual
  );

  return useMemo(() => {
    return tenant.region({
      [Region.HK]: () => {
        return {
          policyNoInfo: lodash
            .chain(claimPayableListMap)
            .map((item: any) => {
              const policyNoClean = formUtils.queryValue(item.policyNo);
              return {
                dictCode: policyNoClean,
                dictName: policyNoClean,
              };
            })
            .uniqBy('dictCode')
            .value(),
          policyNo: lodash.isEmpty(policyNo) ? defaultPolicyId : policyNo,
        };
      },
      notMatch: () => {
        return {
          policyNoInfo,
        };
      },
    });
  }, [claimNo, policyNo]);
};
