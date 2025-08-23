import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

type Params = {
  benefitPlan?: string;
  productCode: string;
};

export default (params: Params) => {
  const cfgPlanHospitalBenefits = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.cfgPlanHospitalBenefits,
    shallowEqual
  );
  return lodash.find(cfgPlanHospitalBenefits, params);
};
