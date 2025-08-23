import { produce }  from 'immer';
import lodash from 'lodash';

const payeeDelete = (state: any, action: any) => {
  const { payeeId } = action.payload;

  const nextState = produce(state, (draftState) => {
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
  });

  return { ...nextState };
};

export default payeeDelete;
