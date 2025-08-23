import { useCallback } from 'react';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { Status } from 'claim/enum/medicalProvider';
import { searchMedicalProvider } from '@/services/miscAddressInformationControllerService';

const dataMaping = (datas: any[], dictCode: string, dictName: string, extraNameFn?: Function) => {
  return lodash.map(datas, (data: any) => ({
    dictCode: data[dictCode || 'dictCode'],
    dictName: lodash.isFunction(extraNameFn) ? extraNameFn(data) : data[dictName || 'dictName'],
    ...data,
  }));
};

export default () => {
  return useCallback(async (target: any) => {
    const params = lodash.get(target, 'params');
    const paramsTemp: any = {
      currentPage: target?.currentPage,
      params: {
        pageSize: params?.pageSize,
        regionCode: tenant.region(),
        searchContent: params?.searchContent,
        status: Status.A,
      },
    };

    const response = await searchMedicalProvider(paramsTemp, {});
    if (response && response.success && response.resultData) {
      const list = lodash.get(response, 'resultData.rows', []);
      const rows = dataMaping(
        list,
        'medicalProviderCode',
        'medicalProviderName',
        (data: any) =>
          `${data?.medicalProviderName}${
            data?.provinceDescription ? `, ${data?.provinceDescription}` : ''
          }`
      );
      lodash.set(response, 'resultData.rows', rows);
      return response;
    }
    return [];
  }, []);
};
