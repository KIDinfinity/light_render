import { produce } from 'immer';
import lodash from 'lodash';

const therapeuticMonthListUpdate = (state: any, action: any) => {
  const { otherProcedureId, id, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    let extra: any = {};
    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList =
      lodash.map(
        draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList || [],
        (item: any) => {
          return item.id === id
            ? {
                ...item,
                ...changedFields,
                ...extra,
              }
            : item;
        }
      );
  });

  return { ...nextState };
};

export default therapeuticMonthListUpdate;
