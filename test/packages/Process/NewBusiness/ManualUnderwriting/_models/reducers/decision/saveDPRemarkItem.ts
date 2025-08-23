import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { id, changedFields } = action.payload;
  const { addDPRemarkItems } = state;

  const ownAddDPRemarkItem = lodash.find(addDPRemarkItems, (item: any) => item?.id === id);
  const index = lodash.findIndex(addDPRemarkItems, (item: any) => item?.id === id);

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) !== 1) return draftState;

    const path = `addDPRemarkItems[${index}]`;

    if (lodash.has(changedFields, 'reasonCode')) {
      if (changedFields.reasonCode === null)
        lodash.set(draftState, path, {
          ...ownAddDPRemarkItem,
          ...changedFields,
        });
      const targetObject = lodash.find(draftState.DPRemarkList, (item: any) => {
        return item.localExclusionCode === formUtils.queryValue(changedFields.reasonCode);
      });
      lodash.set(draftState, path, {
        ...ownAddDPRemarkItem,
        ...changedFields,
        shortDescription:
          targetObject?.longDesc ??
          formUtils.queryValue(lodash.chain(draftState).get(`${path}.longDescription`).value()),
      });
    } else if (lodash.has(changedFields, 'shortDescription')) {
      if (changedFields.shortDescription === null)
        lodash.set(draftState, path, {
          ...ownAddDPRemarkItem,
          ...changedFields,
        });
      const targetObject = lodash.find(draftState.DPRemarkList, (item: any) => {
        return item.localExclusionCode === formUtils.queryValue(changedFields.shortDescription);
      });
      lodash.set(draftState, path, {
        ...ownAddDPRemarkItem,
        ...changedFields,
        reasonCode: targetObject?.localExclusionCode,
        longDescription:
          targetObject?.additionalInfo ??
          formUtils.queryValue(lodash.chain(draftState).get(`${path}.longDescription`).value()),
      });
    } else {
      lodash.set(draftState, path, {
        ...ownAddDPRemarkItem,
        ...changedFields,
      });
    }
    return draftState;
  });
  return {
    ...nextState,
  };
};
