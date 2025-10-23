import { produce } from 'immer';
import lodash from 'lodash';

const removeProcedureItem = (state: any, action: any) => {
  const { treatmentId, procedureId } = action.payload;
  const newProcedureList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].procedureList,
    (item) => item !== procedureId
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.treatmentListMap[treatmentId].procedureList = newProcedureList;
    const procedurePayableIdList = 
      lodash
        .chain(draftState.claimEntities.procedurePayableListMap)
        .filter((procedurePayable) => 
          procedureId === procedurePayable.procedureId
        )
        .map(procedurePayable => procedurePayable.id)
        .value();

    draftState.claimEntities.procedurePayableListMap = lodash.pickBy(draftState.claimEntities.procedurePayableListMap, 
      procedurePayable => procedurePayable.procedureId !== procedureId
    )

    draftState.claimEntities.treatmentPayableListMap = lodash.mapValues(draftState.claimEntities.treatmentPayableListMap, 
      treatmentPayable => {
        if(treatmentPayable?.procedurePayableList?.length) {
          return {
            ...treatmentPayable,
            procedurePayableList: treatmentPayable.procedurePayableList.filter(id => !procedurePayableIdList.includes(id))
          }
        }
        return treatmentPayable
      }
    )

    delete draftState.claimEntities.procedureListMap[procedureId];
  });

  return { ...nextState };
};

export default removeProcedureItem;
