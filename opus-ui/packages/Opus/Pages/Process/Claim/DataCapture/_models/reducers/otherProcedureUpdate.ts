import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

const otherProcedureUpdate = (state: any, action: any) => {
  const { otherProcedureId, changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'radiationCategory')) {
        changedFields.radiationCategory = lodash.replace(
          formUtils.queryValue(changedFields?.radiationCategory),
          /.*-/,
          ''
        );
      }
    }

    if (!lodash.has(changedFields, 'therapeuticMonthList')) {
      draftState.claimEntities.otherProcedureListMap[otherProcedureId] = {
        ...draftState.claimEntities.otherProcedureListMap[otherProcedureId],
        ...(lodash.isObject(changedFields) ? changedFields : {}),
      };
    }
  });

  return { ...nextState };
};

export default otherProcedureUpdate;
