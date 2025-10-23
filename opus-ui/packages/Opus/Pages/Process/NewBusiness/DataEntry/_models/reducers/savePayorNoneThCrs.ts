import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state, action) => {
  const { changedFields, id } = action?.payload || {};
  return produce(state, (draftState) => {
    const noneThCrs = draftState.processData.payorCrs?.nonThCrsList?.find((item) => item.id === id);
    formUtils.saveChangedFields({ baseObject: noneThCrs, changedFields });
  });
};
