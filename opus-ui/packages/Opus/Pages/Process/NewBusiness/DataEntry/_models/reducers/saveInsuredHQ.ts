import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  return produce(state, (draftState) => {
    formUtils.saveChangedFields({
      baseObject: draftState.processData,
      path: 'insuredHQ',
      changedFields,
    });
  });
};
