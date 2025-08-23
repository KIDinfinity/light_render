import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const removeProcedureItem = (state: any, action: any) => {
  const { treatmentId, procedureId } = action.payload;
  const newProcedureList = lodash.filter(
    state.claimEntities.treatmentListMap[treatmentId].procedureList,
    (item) => item !== procedureId
  );

  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.treatmentListMap[treatmentId].procedureList = newProcedureList;
    delete draftState.claimEntities.procedureListMap[procedureId];
    draftState.claimEntities.serviceItemListMap = lodash.reduce(
      lodash.cloneDeep(draftState.claimEntities.serviceItemListMap),
      (map: Object, item: any, key: string) => {
        return {
          ...map,
          [key]:
            formUtils.queryValue(item.procedureCode) === procedureId
              ? { ...item, procedureCode: '' }
              : item,
        };
      },
      {}
    );
  });

  return { ...nextState };
};

export default removeProcedureItem;
