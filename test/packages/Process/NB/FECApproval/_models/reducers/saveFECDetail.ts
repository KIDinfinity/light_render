import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action, 'payload.changedFields', {});
  const index = lodash.get(action, 'payload.index', 0);

  const nextState = produce(state, (draftState: any) => {
    const FecDetail = lodash.get(draftState, `businessData.fecInfo.detailList.${index}`, {});
    lodash.set(draftState, `businessData.fecInfo.detailList.${index}`, {
      ...FecDetail,
      ...changedFields,
    });
  });
  return {
    ...nextState,
  };
};
