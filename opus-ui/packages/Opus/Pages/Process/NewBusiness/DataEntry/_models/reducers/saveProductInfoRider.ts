import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';

export default (state, action) => {
  const { changedFields, id } = action?.payload || {};
  return produce(state, (draftState) => {
    const rider = draftState.processData.productInfoRiders?.find((item) => item.id === id);
    formUtils.saveChangedFields({ baseObject: rider, changedFields });
  });
};
