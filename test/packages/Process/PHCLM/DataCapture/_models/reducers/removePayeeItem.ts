import { produce }  from 'immer';
import lodash from 'lodash';

const removePayeeItem = (state: any, action: any) => {
  const { payeeId } = action.payload;

  const nextState = produce(state, (draft: any) => {
    const draftState = draft;
    draftState.claimProcessData.payeeList = lodash
      .chain(state.claimProcessData.payeeList)
      .filter((item) => item && item !== payeeId)
      .compact()
      .value();
    draftState.claimEntities.payeeListMap = lodash.reduce(
      draftState.claimEntities.payeeListMap,
      (collect, value, key) => {
        if (key && key !== payeeId) {
          lodash.set(collect, key, value);
        }
        return collect;
      },
      {}
    );
    draftState.selectedPayeeId = draftState.claimProcessData.payeeList[0]
  });

  return { ...nextState };
};

export default removePayeeItem;
