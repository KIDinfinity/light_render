import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, id } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const loanDetailList =
      draftState.businessData?.policyList?.[0].loanInfoList?.[0].loanDetailList || [];
    draftState.businessData.policyList[0].loanInfoList[0].loanDetailList = lodash.map(
      loanDetailList,
      (el: any) => {
        return el.id === id
          ? {
              ...el,
              ...changedFields,
            }
          : el;
      }
    );
  });

  return {
    ...nextState,
  };
};
