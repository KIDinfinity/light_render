import { useCallback } from 'react';
import lodash from 'lodash';
import { search } from '@/services/navigatorDropdownControllerService';
import { internationalization } from '../utils';
import { tenant } from '@/components/Tenant';

interface IParams {
  dropdownCode: string;
  otherParams: any;
  bankCodeLength: number;
  searchCustom?: Function;
  internationalizationType?: string;
  setLoading: Function;
  setDataList: Function;
  setPaginationData: Function;
  signal?: any;
  customUrl?: Function;
  callBackSetDataList?: Function;
  isFreeText: boolean;
  freeTextHiddenName?: boolean;
  saveName?: boolean;
  paginationData?: any;
  allowEmptySearch?: boolean;
}

export default ({
  dropdownCode,
  otherParams,
  bankCodeLength,
  searchCustom,
  internationalizationType,
  setLoading,
  setDataList,
  saveName,
  setPaginationData,
  paginationData,
  customUrl,
  callBackSetDataList,
  isFreeText,
  freeTextHiddenName,
  allowEmptySearch = true,
}: IParams) => {
  const fnSearch = customUrl || (lodash.isFunction(searchCustom) ? searchCustom : search);

  return useCallback(
    ({ pageSize, searchContent, current, signal, extraData }) => {
      let params: any = {
        pageSize,
        current,
        searchType: 3,
        dropdownCode,
        searchContent,
        ...otherParams,
      };
      if (lodash.isNumber(bankCodeLength)) {
        params = { ...params, bankCodeLength };
      }

      (async () => {
        if (!searchContent && !allowEmptySearch) return;
        setLoading(true);

        const options = {
          currentPage: current,

          ...(internationalizationType
            ? {
                params: {
                  regionCode: tenant.region(),
                  cityName: searchContent,
                },
                pageSize,
              }
            : {
                params: {
                  ...params,
                  extraData,
                  regionCode: tenant.region(),
                },
              }),
        };

        // TODO 发生请求找不到对应响应，缓存后再也不会发起请求
        const result: any = await fnSearch(options, { signal });

        if (
          result?.success &&
          lodash.isPlainObject(result?.resultData) &&
          lodash.isArray(result?.resultData?.rows)
        ) {
          let list = result?.resultData?.rows || [];
          let total = result?.resultData?.total || 0;
          let totalPage = result?.resultData?.totalPage || 0;
          if (lodash.isEmpty(list) && isFreeText) {
            console.log('searchContent----', { searchContent, saveName });
            list = [
              {
                dictCode: searchContent,
                dictName: `${saveName || freeTextHiddenName ? searchContent : ''}`,
              },
            ];
            total = 1;
            totalPage = 1;
          }
          // TODO:这个逻辑太业务,实际上不应该在这里去处理
          if (customUrl) {
            list = list.map((item: any) => ({
              dictCode: item.dictCode || item.serviceItemCode || '',
              dictName: item.dictName || item.serviceItemName || '',
              repeatable: item.repeatable || '',
            }));
          }

          setDataList(
            internationalizationType ? internationalization(internationalizationType, list) : list
          );

          if (callBackSetDataList) {
            callBackSetDataList(list);
          }

          setPaginationData({
            ...paginationData,
            total: total,
            totalPage: totalPage,
            // current: result?.resultData?.currentPage || 1,
          });
        }

        setLoading(false);
      })();
    },
    [
      dropdownCode,
      otherParams,
      bankCodeLength,
      allowEmptySearch,
      setLoading,
      internationalizationType,
      fnSearch,
      setDataList,
      setPaginationData,
      isFreeText,
      customUrl,
      callBackSetDataList,
      paginationData,
      saveName,
    ]
  );
};
