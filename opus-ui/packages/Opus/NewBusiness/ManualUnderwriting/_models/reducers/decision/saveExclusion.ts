import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { editCopy } from 'opus/NewBusiness/ManualUnderwriting/_utils/copyRuleMatching';

export default (state: any, action: any) => {
  const { id, changedFields, productCode, coverageId } = action.payload;
  const ownPolicyExclusionList = lodash.get(state, 'processData.policyExclusionList', []) || [];
  const ownCoverageList = lodash.get(state, 'processData.coverageList', []) || [];
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
    const path =
      productCode === 'All'
        ? `processData.policyExclusionList[${index}]`
        : `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`;
    const _changeFields = Object.keys(changedFields).map((key) => ({ [key]: changedFields[key] }));
    _changeFields.forEach((changedFieldItem) => {
      if (lodash.has(changedFieldItem, 'code')) {
        const targetObject = lodash.find(draftState.exclusionList, (item: any) => {
          return item.localExclusionCode === formUtils.queryValue(changedFieldItem.code);
        });
        const previousValue = lodash.get(
          draftState,
          `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`
        );
        const previousCode = formUtils.queryValue(previousValue?.code);
        const currentCode = formUtils.queryValue(changedFieldItem.code);
        lodash.set(draftState, path, {
          ...ownExclusionItem,
          ...previousValue,
          ...changedFieldItem,
          shortName: targetObject?.longDesc,
          reason:
            previousCode !== currentCode ? targetObject?.additionalInfo : previousValue?.reason,
        });
      } else if (lodash.has(changedFieldItem, 'shortName')) {
        const targetObject = lodash.find(draftState.exclusionList, (item: any) => {
          return item.longDesc === formUtils.queryValue(changedFieldItem.shortName);
        });
        const previousValue = lodash.get(
          draftState,
          `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`
        );
        lodash.set(draftState, path, {
          ...ownExclusionItem,
          ...previousValue,
          ...changedFieldItem,
          longDescription: targetObject?.additionalInfo
            ? targetObject?.additionalInfo
            : formUtils.queryValue(
                lodash.chain(draftState).get(path).get('longDescription').value()
              ),
        });
      } else if (lodash.has(changedFieldItem, 'exclusionReasonCode')) {
        const exclusionReason = lodash.find(draftState.exclusionReasonList, {
          localExclusionCode: formUtils.queryValue(changedFieldItem.exclusionReasonCode),
        })?.longDesc;
        const previousValue = lodash.get(
          draftState,
          `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`
        );
        lodash.set(draftState, path, {
          ...ownExclusionItem,
          ...previousValue,
          ...changedFieldItem,
          exclusionReason,
        });
      } else if (productCode === 'All') {
        lodash.set(draftState, `policyExclusionList[${index}]`, {
          ...ownExclusionItem,
          ...changedFieldItem,
        });
      } else {
        const previousValue = lodash.get(
          draftState,
          `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`
        );
        lodash.set(
          draftState,
          `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`,
          {
            ...ownExclusionItem,
            ...previousValue,
            ...changedFieldItem,
          }
        );
      }
    });
    if (productCode !== 'All' && lodash.size(changedFields) === 1) {
      const copyItem = lodash.get(draftState, path);
      const coverageItem = draftState.processData.coverageList[coverageIndex];
      const coreCode = formUtils.queryValue(coverageItem.coreCode);
      if (formUtils.queryValue(copyItem.code)) {
        editCopy(draftState, {
          copyItem,
          isLoading: false,
          coreCode,
          insuredList: coverageItem.coverageInsuredList,
        });
      }
    }

    return draftState;
  });
  return {
    ...nextState,
  };
};
