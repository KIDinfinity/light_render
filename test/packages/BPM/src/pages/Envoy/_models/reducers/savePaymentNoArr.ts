import lodash from 'lodash';

interface IAction {
  payload: {
    paymentNoArr: any[];
  };
}

export default function savePaymentNoArr(state: any, { payload }: IAction) {
  const { paymentNoArr } = payload;
  return {
    ...state,
    paymentNoArr: lodash.map(paymentNoArr, (item: string) => ({
      dictCode: item,
      dictName: item,
    })),
  };
};
