import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    changedFields: Record<string, any>;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields, itemData, isLast } = action?.payload;
  const fundCode = formUtils.queryValue(changedFields?.fundCode);
  const productItem = state?.modalData?.fund?.productCodeList?.[fundCode];
  const defaultFundCurrency = productItem?.fundCurrency;
  const fundName = productItem?.fundName;
  const old = state.modalData.fund?.fundList?.[itemData?.id] || {};
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.fund.fundList[itemData?.id] = {
      ...old,
      fundCurrency: defaultFundCurrency,
      ...itemData,
      ...changedFields,
      fundName,
      isLast,
    };
  });
  return { ...nextState };
};
