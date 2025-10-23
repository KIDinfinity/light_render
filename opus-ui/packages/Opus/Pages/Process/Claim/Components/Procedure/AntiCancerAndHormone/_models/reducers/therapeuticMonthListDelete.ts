import { produce } from 'immer';
import lodash from 'lodash';

const therapeuticMonthListDelete = (state: any, action: any) => {
  const { otherProcedureId, id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const therapeuticMonthList =
      draftState?.claimEntities?.otherProcedureListMap?.[otherProcedureId]?.therapeuticMonthList ||
      [];

    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = lodash
      .chain(therapeuticMonthList)
      .filter((item) => item.id !== id)
      .value();
  });

  return { ...nextState };
};

export default therapeuticMonthListDelete;
