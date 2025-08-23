import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

import { getPlanJPStdAdvancedMedicalList } from '@/services/claimJpPlanStandardControllerService';

export default async (params: any) => {
  const regionCode = tenant.region();
  const response = await getPlanJPStdAdvancedMedicalList({
    currentPage: 1,
    params: {
      pageSize: 10,
      current: 1,
      searchType: 3,
      searchContent: params[0],
      regionCode: regionCode,
    },
    pageSize: 10,
  });
  if (response?.success && response?.resultData) {
    lodash.set(
      response,
      'resultData',
      lodash
        .chain(response.resultData?.rows || [])
        .map((el: any) => ({
          ...el,
          dictCode: el.treatmentCode,
          dictName: el.treatmentCode + '-' + el.treatmentName,
          treatmentProviders: lodash.map(el.treatmentProviders, (treatmentProvidersItem: any) => ({
            ...treatmentProvidersItem,
            dictCode: treatmentProvidersItem.treatmentProvider,
            dictName: treatmentProvidersItem.treatmentProvider,
          })),
        }))
        .value() || []
    );
  }

  return response;
};
