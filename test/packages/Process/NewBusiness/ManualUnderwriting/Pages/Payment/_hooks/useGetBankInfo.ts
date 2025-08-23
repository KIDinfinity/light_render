import { useMemo } from 'react';
import lodash from 'lodash';

interface IParams {
  type: string;
  bankInfoList: any[];
}

// TODO:获取bankInfo的逻辑可以放在后端去做
export default ({ type, bankInfoList }: IParams) => {
  return useMemo(() => {
    const item = lodash.find(bankInfoList, { type }) || {};
    // 如果找不到,找第一条没有typecode的(jira:NBID-231)
    const newItem =
      lodash.isEmpty(item) && type === 'R'
        ? lodash
            .chain(bankInfoList)
            .find(({ type }: any) => !type)
            .value() || {}
        : item;

    if (lodash.isEmpty(newItem)) return {};

    return {
      ...newItem,
    };
  }, [bankInfoList, type]);
};
