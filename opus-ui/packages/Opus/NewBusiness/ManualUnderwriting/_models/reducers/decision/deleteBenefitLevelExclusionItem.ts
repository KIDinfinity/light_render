import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { id, coverageItemId, exclusionRemarkSingle = 'N' } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const coverageList = lodash.get(draftState, 'processData.coverageList', []);

    const removeExclusionFromCoverage = (matchObj, coverageItem) => {
      const coverageExclusionList = coverageItem.coverageExclusionList ?? [];
      const removeIdx = lodash.findIndex(coverageExclusionList, matchObj);
      if(removeIdx === -1)
        return;
      const [removedExclusion] = (coverageExclusionList as any[]).splice(removeIdx, 1);
      // MDLTH-4832 移除第一条exclusion时，会将reason的值放入第2条中。即保持reason永远放在exclusion list 中第一条中。
      if (
        exclusionRemarkSingle === 'Y' &&
        removeIdx === 0 &&
        removedExclusion
      ) {
        if(coverageExclusionList.length > 0) {
          coverageExclusionList[0].reason1 = removedExclusion.reason1;
          coverageExclusionList[0].reason2 = removedExclusion.reason2;
          coverageExclusionList[0].reason3 = removedExclusion.reason3;
        }
      }
    }
    coverageList.map(coverageItem => {
      if(coverageItem.id === coverageItemId) {
        removeExclusionFromCoverage({ id }, coverageItem);
      } else {
        removeExclusionFromCoverage({ copyId: id }, coverageItem);
      }
    })
    
  });
  return {
    ...nextState,
  };
};
