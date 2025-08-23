import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
const saveOtherProcedureItem = (state: any, action: any) => {
  const { changedFields, otherProcedureId } = action.payload;
  const finalChangedFields = { ...changedFields };
  const nextState = produce(state, (draftState: any) => {
    if (lodash.has(changedFields, 'radiationCategory') && lodash.size(changedFields) === 1) {
      finalChangedFields.radiationCategory = lodash.replace(
        formUtils.queryValue(changedFields?.radiationCategory),
        /.*-/,
        ''
      );
    }

    draftState.claimEntities.otherProcedureListMap[otherProcedureId] = {
      ...state.claimEntities.otherProcedureListMap[otherProcedureId],
      ...finalChangedFields,
    };
  });

  return { ...nextState };
};
export default saveOtherProcedureItem;
