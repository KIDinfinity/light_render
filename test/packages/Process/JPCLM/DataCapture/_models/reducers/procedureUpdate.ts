import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import links from '../links';

const procedureUpdate = (state: any, action: any) => {
  const { procedureId, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'procedureName')) {
        changedFields.procedureName = lodash.replace(
          formUtils.queryValue(changedFields?.procedureName),
          /.*-/,
          ''
        );
        changedFields.partOfBody = '';
      }
      links.procedure_procedureCode({ draftState, changedFields, procedureId });
    }

    draftState.claimEntities.procedureListMap[procedureId] = {
      ...draftState.claimEntities.procedureListMap[procedureId],
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default procedureUpdate;
