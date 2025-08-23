import { useCallback } from 'react';
import lodash from 'lodash';

interface IParams {
  setCodes: Function;
  searchName: Function;
  currentCodes: string[];
  dataList: any[];
  extraData: string;
  callBackCurrentItem: Function;
  setPaginationData: (pagination: any) => void;
  paginationData: any;
}

export default ({
  setCodes,
  searchName,
  currentCodes,
  dataList,
  extraData,
  callBackCurrentItem,
}: IParams) => {
  return useCallback(
    (code) => {
      if (lodash.isEmpty(code)) {
        return;
      }
      (async () => {
        let codes: string[] = [];
        if (typeof code === 'string') {
          codes = [code];
        }
        if (Array.isArray(code)) {
          codes = code;
        }

        const dropdownCodes = lodash.map(dataList, (item) => item.dictCode);
        const currentCodesList = lodash
          .chain(currentCodes)
          .map((item) => item && item?.dictCode)
          .filter((item) => item)
          .value();

        const searchCodes = [...codes]
          .filter((item) => !currentCodesList.includes(item))
          .filter((item) => !!item)
          .filter((item) => !dropdownCodes.includes(item));
        if (searchCodes.length === 0) {
          return false;
        }

        if (lodash.isFunction(searchName)) {
          searchName(searchCodes, extraData).then((response: any) => {
            const list = lodash.get(response, 'resultData', []);
            const addCodes = lodash.uniqBy(lodash.concat(list, currentCodes), 'dictCode');
            setCodes(addCodes);
            lodash.isFunction(callBackCurrentItem) && callBackCurrentItem(list);
          });
        }
      })();
    },
    [setCodes, searchName, currentCodes]
  );
};
