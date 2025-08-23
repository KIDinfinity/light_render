import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { formatMessageApi, getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';
function useNBStore<RType = any>(path: string) {
  const value = useSelector(
    (state: any) => lodash.get(state, `${NAMESPACE}.${path}`),
    shallowEqual
  );
  return value as RType;
}
type Params = {
  clientId: string;
  labelId: string;
  labelTypeCode: string;
};
type PlanProductConfig = {
  id: string;
  productCode: string;
  ageFormularCode?: string;
};
type CoverageItem = {
  id: string;
  productCode: string;
  isMain?: 'Y' | 'N';
};

export const useGetCustomerAgeTitle = ({ clientId, labelId, labelTypeCode }: Params) => {
  const Dropdown_IND_AgeFormular = getDrowDownList('Dropdown_IND_AgeFormular');
  const mainAgeTittle = formatMessageApi({ [labelTypeCode]: labelId });
  const basicPlanProductFeatureList = useNBStore<PlanProductConfig[]>(
    'planProductConfig.basicPlanProductFeatureList'
  );
  const coverageList = useNBStore<CoverageItem[]>('processData.coverageList');
  const needShowSpecialAgeLabel =
    useNBStore(`entities.clientMap.${clientId}.needShowSpecialAgeLabel`) || false;
  const baseProductCode = lodash.find(coverageList, (item) => item.isMain === 'Y')?.productCode;
  const ageFormularCode = lodash.find(
    basicPlanProductFeatureList,
    (item) => item.productCode === baseProductCode
  )?.ageFormularCode;
  const customerAgeSubTittle = lodash.find(
    Dropdown_IND_AgeFormular,
    (item) => item.dictCode === ageFormularCode
  )?.dictName;
  if (!!customerAgeSubTittle && needShowSpecialAgeLabel) {
    return `${mainAgeTittle} (${customerAgeSubTittle})`;
  }
  return mainAgeTittle;
};
