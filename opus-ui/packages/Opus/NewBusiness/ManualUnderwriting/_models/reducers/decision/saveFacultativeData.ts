import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { changedFields, coverageId } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    const ownCoverageList = lodash.get(draftState, 'processData.coverageList', []) || [];
    const index = lodash
      .chain(ownCoverageList)
      .findIndex((item: any) => item?.id === coverageId)
      .value();
    if (lodash.has(changedFields, 'facultativePackageCode')) {
      lodash.set(
        draftState,
        `processData.coverageList[${index}].facultativePackageCode`,
        changedFields.facultativePackageCode
      );
    }
    if (lodash.has(changedFields, 'facultativeReason')) {
      lodash.set(
        draftState,
        `processData.coverageList[${index}].facultativeReason`,
        changedFields.facultativeReason
      );
    }
  });
  return { ...nextState };
};
