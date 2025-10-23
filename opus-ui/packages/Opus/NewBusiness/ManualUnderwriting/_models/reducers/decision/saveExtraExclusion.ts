import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import { editCopy } from 'opus/NewBusiness/ManualUnderwriting/_utils/copyRuleMatching';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, coverageId } = action.payload;
  const ownCoverageList = lodash.get(state, 'processData.coverageList', []) || [];
  const coverageIndex = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);
  const { coverageExclusionList } = ownCoverageList[coverageIndex];

  const nextState = produce(state, (draftState: any) => {
    lodash.entries(changedFields).forEach(([key, changedFieldItem]: any) => {
      if (['reason1', 'reason2', 'reason3'].includes(key)) {
        lodash.forEach(coverageExclusionList ?? [], (ex, i: number) => {
          const previousValue = lodash.get(
            draftState,
            `processData.coverageList[${coverageIndex}].coverageExclusionList[${i}]`,
            {}
          );

          lodash.set(
            draftState,
            `processData.coverageList[${coverageIndex}].coverageExclusionList[${i}]`,
            {
              ...previousValue,
              ...(i === 0
                ? { [changedFieldItem.name]: changedFieldItem }
                : { [changedFieldItem.name]: undefined }),
              reason: undefined,
            }
          );
        });
      }
    });

    if (lodash.size(changedFields) === 1) {
      const copyItem = lodash.get(draftState, `processData.coverageList[${coverageIndex}].coverageExclusionList[0]`);
      const coverageItem = draftState.processData.coverageList[coverageIndex];
      const coreCode = formUtils.queryValue(coverageItem.coreCode);
      if(formUtils.queryValue(copyItem.code)) {
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
