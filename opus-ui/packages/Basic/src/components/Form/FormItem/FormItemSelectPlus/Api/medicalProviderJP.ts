import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

import { getPlanJPStdAdvancedMedicalList } from '@/services/claimJpPlanStandardControllerService';

export default async (params: any) => {
  const splictIndex = params[0]?.indexOf('-');
  const regionCode = tenant.region();
  const response = await getPlanJPStdAdvancedMedicalList({
    currentPage: 1,
    params: {
      pageSize: 10,
      current: 1,
      searchType: 3,
      searchContent: splictIndex > -1 ? params[0]?.split('-')[0] : params[0],
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
        .map((el: any) => [
          {
            ...el,
            dictCode: el.treatmentCode + '-' + el.treatmentName,
            dictName: el.treatmentCode + '-' + el.treatmentName,
            treatmentProviders: lodash.map(
              el.treatmentProviders,
              (treatmentProvidersItem: any) => ({
                ...treatmentProvidersItem,
                dictCode: treatmentProvidersItem.treatmentProvider,
                dictName: treatmentProvidersItem.treatmentProvider,
              })
            ),
          },
          {
            dictCode: el.treatmentCode,
            dictName: el.treatmentCode + '-' + el.treatmentName,
            hidden: true,
          },
        ])
        .flatten()
        .value() || []
    );
  }

  return response;
};
