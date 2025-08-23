import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { id, changedFields } = action.payload;
  const { addPopExclusionList } = state;
  const ownAddPopExclusionItem = lodash.find(addPopExclusionList, (item: any) => item?.id === id);
  const index = lodash.findIndex(addPopExclusionList, (item: any) => item?.id === id);

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'code')) {
        const targetObject = lodash.find(draftState.exclusionList, (item: any) => {
          return item.localExclusionCode === formUtils.queryValue(changedFields.code);
        });
        lodash.set(draftState, `addPopExclusionList[${index}]`, {
          ...ownAddPopExclusionItem,
          ...changedFields,
          shortName: targetObject?.longDesc,
          longDescription: targetObject?.additionalInfo
            ? targetObject?.additionalInfo
            : formUtils.queryValue(
                lodash.get(draftState, `addPopExclusionList[${index}].longDescription`)
              ),
        });
      } else if (lodash.has(changedFields, 'shortName')) {
        const targetObject = lodash.find(draftState.exclusionList, (item: any) => {
          return item.longDesc === formUtils.queryValue(changedFields.shortName);
        });
        lodash.set(draftState, `addPopExclusionList[${index}]`, {
          ...ownAddPopExclusionItem,
          ...changedFields,
          code: targetObject?.localExclusionCode,
          longDescription: targetObject?.additionalInfo
            ? targetObject?.additionalInfo
            : formUtils.queryValue(
                lodash.get(draftState, `addPopExclusionList[${index}].longDescription`)
              ),
        });
      } else if (lodash.has(changedFields, 'exclusionReasonCode')) {
        const exclusionReasonCodeArr = formUtils
          .queryValue(changedFields.exclusionReasonCode)
          ?.split(',');
        const exclusionReasonArr = lodash.map(exclusionReasonCodeArr, (item) => {
          return lodash.find(draftState.exclusionReasonList, {
            localExclusionCode: item,
          })?.longDesc;
        });
        const exclusionReason = exclusionReasonArr?.join(',');
        lodash.set(draftState, `addPopExclusionList[${index}]`, {
          ...ownAddPopExclusionItem,
          ...changedFields,
          exclusionReason,
        });
      } else {
        lodash.set(draftState, `addPopExclusionList[${index}]`, {
          ...ownAddPopExclusionItem,
          ...changedFields,
        });
      }
      return draftState;
    }
  });
  return {
    ...nextState,
  };
};
