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
  saveName?: boolean;
  paginationData?: any;
  allowEmptySearch?: boolean;
  finalValue?: string;
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
  allowEmptySearch = true,
  finalValue,
}: IParams) => {
  const fnSearch = customUrl || (lodash.isFunction(searchCustom) ? searchCustom : search);

  return useCallback(
    ({ pageSize, searchContent, current, signal, localDicts, extraData }) => {
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
        let list;
        let total = 0;
        let totalPage = 0;
        if (lodash.isArray(localDicts) && localDicts?.length > 0) {
          let filteredList = lodash.cloneDeep(localDicts);
          if (searchContent) {
            const lowerSearch = searchContent.toLowerCase();
            filteredList = localDicts.filter((item: any) => {
              const name = item.dictName?.toLowerCase() || '';
              const code = item.dictCode?.toLowerCase() || '';
              const nameAndCode = name + code;
              return nameAndCode.includes(lowerSearch);
            });
          }

          //使用localDicts分页
          list = filteredList?.slice((current - 1) * 10, current * 10) || [];
          if (finalValue && current === 1 && lodash.isEmpty(searchContent)) {
            //添加上当前已选择的item，防止影响加载页面不在第一页
            const finalItem = localDicts?.find((item: any) => item?.dictCode === finalValue);
            if (finalItem) {
              list = lodash.uniqBy([...list, finalItem], 'dictCode');
            }
          }
          total = filteredList?.length || 0;
          //这里因为pageSize在前面固定了10，所以直接计算，如果后面可以调整size了，那这里要改
          totalPage = (Math.floor(total / 10) || 0) + 1;
        } else {
          //使用远程Dicts分页
          // TODO 发生请求找不到对应响应，缓存后再也不会发起请求
          const result: any = await fnSearch(options, { signal });
          if (
            result?.success &&
            lodash.isPlainObject(result?.resultData) &&
            lodash.isArray(result?.resultData?.rows)
          ) {
            list = result?.resultData?.rows || [];
            total = result?.resultData?.total || 0;
            totalPage = result?.resultData?.totalPage || 0;
          }
        }
        if (lodash.isArray(list)) {
          if (lodash.isEmpty(list) && isFreeText) {
            list = [
              {
                dictCode: searchContent,
                dictName: `${saveName ? searchContent : ''}`,
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
