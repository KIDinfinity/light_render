import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const therapeuticMonthListAdd = (state: any, action: any) => {
  const { otherProcedureId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const oldTherapeuticMonthList =
      draftState.claimEntities.otherProcedureListMap?.[otherProcedureId]?.therapeuticMonthList ||
      [];

    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = [
      ...oldTherapeuticMonthList,
      {
        id: uuidv4(),
        therapeuticMonth: '',
        therapeuticDateList: '[]',
      },
    ];
  });

  return { ...nextState };
};

export default therapeuticMonthListAdd;
