import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid } from 'uuid';

export default (state: any, action: any) => {
  const { coverageId } = lodash.pick(action?.payload, ['coverageId']);
  const nextState = produce(state, (draftState: any) => {
    const coverageIndex = lodash
      .chain(state)
      .get('processData.coverageList', [])
      .findIndex((item: any) => item?.id === coverageId)
      .value();
    const coverageExclusionList =
      lodash
        .chain(state)
        .get('processData.coverageList', [])
        .find((item: any) => item?.id === coverageId)
        .get('coverageExclusionList', [])
        .value() || [];
    lodash.set(draftState, `processData.coverageList[${coverageIndex}].coverageExclusionList`, [
      ...coverageExclusionList,
      {
        id: uuid(),
      },
    ]);
  });
  return {
    ...nextState,
  };
};
