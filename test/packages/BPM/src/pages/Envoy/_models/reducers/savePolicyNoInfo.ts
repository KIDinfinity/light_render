import lodash from 'lodash';

interface IAction {
  payload: {
    businessNo: string;
    policyNoArr: any[];
  };
}
export default function savePolicyNoInfo(state: any, { payload }: IAction) {
  const { businessNo, policyNoArr } = payload;
  const { policyNoInfo } = state;
  return {
    ...state,
    policyNoInfo: {
      ...policyNoInfo,
      [businessNo]: lodash.map(policyNoArr, (item: string) => ({
        dictCode: item,
        dictName: item,
      })),
    }
  };
};

