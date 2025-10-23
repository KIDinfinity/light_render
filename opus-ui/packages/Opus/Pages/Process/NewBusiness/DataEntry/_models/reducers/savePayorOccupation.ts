import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state, action) => {
  const { changedFields } = action?.payload || {};
  return produce(state, draftState => {
    if (
      lodash.has(changedFields, 'occupationName') &&
      lodash.keys(changedFields).length === 1
    ) {
      lodash.set(changedFields, 'occupationClass', null);
      lodash.set(changedFields, 'natureOfBusiness', null);
    }
    if (
      lodash.has(changedFields, 'otherOccupation') &&
      lodash.keys(changedFields).length === 1
    ) {
      lodash.set(changedFields, 'otherOccupationClass', null);
      lodash.set(changedFields, 'otherNatureOfBusiness', null);
    }
    formUtils.saveChangedFields({ baseObject: draftState.processData, path: 'payorOccupation', changedFields});
  })
}