import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    changedFields: Record<string, any>;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action?.payload;
  const fundCode = formUtils.queryValue(changedFields?.fundCode);
  const productItem = state?.modalData?.fund?.productCodeList?.[fundCode];
  const defaultFundCurrency = productItem?.fundCurrency;
  const fundName = productItem?.fundName;
  const old = state.modalData.fund?.fundList?.[changedFields?.id] || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.fund.fundList[changedFields?.id] = {
      ...old,
      fundCurrency: defaultFundCurrency,
      ...changedFields,
      fundName,
    };
  });
  return { ...nextState };
};
