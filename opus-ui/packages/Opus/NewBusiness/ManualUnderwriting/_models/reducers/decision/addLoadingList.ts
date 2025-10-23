import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { coverageId } = action.payload;
  const id = uuidv4();
  const ownCoverageList = lodash.get(state, 'processData.coverageList', []) || [];
  const ownCoverageLoadingList =
    lodash
      .chain(ownCoverageList)
      .find((item: any) => item?.id === coverageId)
      .get('coverageLoadingList')
      .value() || [];
  const index = lodash.findIndex(ownCoverageList, (item: any) => item?.id === coverageId);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, `processData.coverageList[${index}].coverageLoadingList`, [
      ...ownCoverageLoadingList,
      {
        id,
        code: null,
        extraMortality: null,
        emPeriod: null,
        pmLoading: null,
        pmPeriod: null,
        flatMortality: null,
        fmPeriod: null,
        loadingFunctionType: 'UA',
      },
    ]);
  });
  return {
    ...nextState,
  };
};
