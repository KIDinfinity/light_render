import formUtils from 'basic/components/Form/formUtils';
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, changedFields, coverageId } = action.payload;
  const { businessData } = state;
  const ownCoverageList = lodash.get(businessData, 'policyList[0].coverageList', []) || [];

  const nextState = produce(state, (draftState: any) => {
    lodash.forEach(changedFields, (changedField, changedFieldKey) => {
      const coverageIndex = lodash.findIndex(
        ownCoverageList,
        (item: any) => item?.id === coverageId
      );
      const coverageRemarkIndex = lodash
        .chain(ownCoverageList)
        .find((item: any) => item?.id === coverageId)
        .get('coverageRemarkList')
        .findIndex((e: any) => e?.id === id)
        .value();
      const ownCoverageRemarItem = lodash
        .chain(ownCoverageList)
        .find((item: any) => item?.id === coverageId)
        .get('coverageRemarkList')
        .find((e: any) => e?.id === id)
        .value();

      const path = `businessData.policyList[0].coverageList[${coverageIndex}].coverageRemarkList[${coverageRemarkIndex}]`;

      if (lodash.has(changedFields, 'reasonCode')) {
        const targetObject = lodash.find(draftState.DPRemarkList, (item: any) => {
          return item.localExclusionCode === formUtils.queryValue(changedFields.reasonCode);
        });
        lodash.set(draftState, path, {
          ...ownCoverageRemarItem,
          ...changedFields,
          shortDescription:
            targetObject?.longDesc ??
            formUtils.queryValue(lodash.chain(draftState).get(`${path}.longDescription`).value()),
        });
      } else if (lodash.has(changedFields, 'shortDescription')) {
        const targetObject = lodash.find(draftState.DPRemarkList, (item: any) => {
          return item.localExclusionCode === formUtils.queryValue(changedFields.shortDescription);
        });
        lodash.set(draftState, path, {
          ...ownCoverageRemarItem,
          ...changedFields,
          reasonCode: targetObject?.localExclusionCode,
          longDescription:
            targetObject?.additionalInfo ??
            formUtils.queryValue(lodash.chain(draftState).get(`${path}.longDescription`).value()),
        });
      } else {
        lodash.set(draftState, path, { ...ownCoverageRemarItem, [changedFieldKey]: changedField });
      }
    });

    return draftState;
  });
  return {
    ...nextState,
  };
};
