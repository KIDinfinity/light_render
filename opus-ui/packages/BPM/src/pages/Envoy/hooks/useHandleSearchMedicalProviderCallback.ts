import { tenant } from '@/components/Tenant';
import { searchMedicalProvider } from '@/services/miscAddressInformationControllerService';
import { Status } from 'claim/enum/medicalProvider';
import { useDispatch } from 'dva';
import lodash from 'lodash';
import { useCallback } from 'react';

const dataMaping = (datas: any[], dictCode: string, dictName: string, extraNameFn?: Function) => {
  return lodash.map(datas, (data: any) => ({
    dictCode: data[dictCode || 'dictCode'],
    dictName: lodash.isFunction(extraNameFn) ? extraNameFn(data) : data[dictName || 'dictName'],
    ...data,
  }));
};

export default () => {
  const dispatch = useDispatch();
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
      dispatch({
        type: 'envoyController/setMedicalProviderDicts',
        payload: {
          medicalProviderRows: rows,
        },
      });
      lodash.set(response, 'resultData.rows', rows);
      return response;
    }
    return [];
  }, []);
};
