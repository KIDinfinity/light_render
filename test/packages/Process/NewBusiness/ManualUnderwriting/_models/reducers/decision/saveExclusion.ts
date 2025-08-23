import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { editCopy } from 'process/NewBusiness/ManualUnderwriting/_utils/copyRuleMatching';

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
  if (lodash.size(changedFields) === 1) {
    const path =
      productCode === 'All'
        ? `processData.policyExclusionList[${index}]`
        : `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`;
    if (lodash.has(changedFields, 'code')) {
      const targetObject = lodash.find(state.exclusionList, (item: any) => {
        return item.localExclusionCode === formUtils.queryValue(changedFields.code);
      });
      lodash.set(state, path, {
        ...ownExclusionItem,
        ...changedFields,
        shortName: targetObject?.longDesc,
        longDescription: targetObject?.additionalInfo
          ? targetObject?.additionalInfo
          : formUtils.queryValue(lodash.chain(state).get(path).get('longDescription').value()),
      });
    } else if (lodash.has(changedFields, 'shortName')) {
      const targetObject = lodash.find(state.exclusionList, (item: any) => {
        return item.longDesc === formUtils.queryValue(changedFields.shortName);
      });
      lodash.set(state, path, {
        ...ownExclusionItem,
        ...changedFields,
        code: targetObject?.localExclusionCode,
        longDescription: targetObject?.additionalInfo
          ? targetObject?.additionalInfo
          : formUtils.queryValue(lodash.chain(state).get(path).get('longDescription').value()),
      });
    } else if (lodash.has(changedFields, 'exclusionReasonCode')) {
      const exclusionReasonCodeArr = formUtils
        .queryValue(changedFields.exclusionReasonCode)
        ?.split(',');
      const exclusionReasonArr = lodash.map(exclusionReasonCodeArr, (item) => {
        return lodash.find(state.exclusionReasonList, {
          localExclusionCode: item,
        })?.longDesc;
      });
      const exclusionReason = exclusionReasonArr?.join(',');
      lodash.set(state, path, {
        ...ownExclusionItem,
        ...changedFields,
        exclusionReason,
      });
    } else if (productCode === 'All') {
      lodash.set(state, `policyExclusionList[${index}]`, {
        ...ownExclusionItem,
        ...changedFields,
      });
    } else {
      lodash.set(
        state,
        `processData.coverageList[${coverageIndex}].coverageExclusionList[${index}]`,
        {
          ...ownExclusionItem,
          ...changedFields,
        }
      );
    }
    if (productCode !== 'All') {
      const copyItem = lodash.get(state, path);
      const coverageItem = state.processData.coverageList[coverageIndex];
      const coreCode = formUtils.queryValue(coverageItem.coreCode);
      editCopy(state, {
        copyItem,
        isLoading: false,
        coreCode,
        insuredList: coverageItem.coverageInsuredList,
      });
    }
  }
};
