import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const { id, changedFields, productCode, coverageId } = action.payload;
  const { businessData } = state;
  const ownPolicyExclusionList =
    lodash.get(businessData, 'policyList[0].policyExclusionList', []) || [];
  const ownCoverageList = lodash.get(businessData, 'policyList[0].coverageList', []) || [];
  let ownExclusionItem: any;
  let index: number;
  let coverageIndex: number;

  if (productCode === 'All') {
    index = lodash.findIndex(ownPolicyExclusionList, (item: any) => item?.id === id);
    ownExclusionItem = lodash.find(ownPolicyExclusionList, (item: any) => item?.id === id);
  } else {
    coverageIndex = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);
    index = lodash
      .chain(ownCoverageList)
      .find((item: any) => item?.id === coverageId)
      .get('coverageExclusionList')
      .findIndex((e: any) => e?.id === id)
      .value();
    ownExclusionItem = lodash
      .chain(ownCoverageList)
      .find((item: any) => item?.id === coverageId)
      .get('coverageExclusionList')
      .find((e: any) => e?.id === id)
      .value();
  }

  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      const path =
        productCode === 'All'
          ? `businessData.policyList[0].policyExclusionList[${index}]`
          : `businessData.policyList[0].coverageList[${coverageIndex}].coverageExclusionList[${index}]`;
      if (lodash.has(changedFields, 'code')) {
        const targetObject = lodash.find(draftState.exclusionList, (item: any) => {
          return item.localExclusionCode === formUtils.queryValue(changedFields.code);
        });
        lodash.set(draftState, path, {
          ...ownExclusionItem,
          ...changedFields,
          shortName: targetObject?.longDesc,
          longDescription: targetObject?.additionalInfo
            ? targetObject?.additionalInfo
            : formUtils.queryValue(
                lodash.chain(draftState).get(path).get('longDescription').value()
              ),
        });
      } else if (lodash.has(changedFields, 'shortName')) {
        const targetObject = lodash.find(draftState.exclusionList, (item: any) => {
          return item.longDesc === formUtils.queryValue(changedFields.shortName);
        });
        lodash.set(draftState, path, {
          ...ownExclusionItem,
          ...changedFields,
          code: targetObject?.localExclusionCode,
          longDescription: targetObject?.additionalInfo
            ? targetObject?.additionalInfo
            : formUtils.queryValue(
                lodash.chain(draftState).get(path).get('longDescription').value()
              ),
        });
      } else if (lodash.has(changedFields, 'exclusionReasonCode')) {
        const exclusionReason = lodash.find(draftState.exclusionReasonList, {
          localExclusionCode: formUtils.queryValue(changedFields.exclusionReasonCode),
        })?.longDesc;
        lodash.set(draftState, path, {
          ...ownExclusionItem,
          ...changedFields,
          exclusionReason,
        });
      } else if (productCode === 'All') {
        lodash.set(draftState, `businessData.policyList[0].policyExclusionList[${index}]`, {
          ...ownExclusionItem,
          ...changedFields,
        });
      } else {
        lodash.set(
          draftState,
          `businessData.policyList[0].coverageList[${coverageIndex}].coverageExclusionList[${index}]`,
          { ...ownExclusionItem, ...changedFields }
        );
      }
    }
    //点confirm会自动校验section，changedFields会传入所有field，需要>1这个判断来走这条设值的逻辑，不然没有更新
    if (lodash.size(changedFields) > 1) {
      lodash.set(
        draftState,
        `businessData.policyList[0].coverageList[${coverageIndex}].coverageExclusionList[${index}]`,
        { ...ownExclusionItem, ...changedFields }
      );
    }
  });
  return {
    ...nextState,
  };
};
