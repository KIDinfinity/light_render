import { produce } from 'immer';
import lodash from 'lodash';

const saveWithDataState = (state: any, { payload }: any) => {
  const { incidentId, withData } = payload;

  return produce(state, (draft: any) => {
    const draftState = draft;
    const { withDataState } = draft;
    if (lodash.isString(incidentId)) {
      const withDataExist = lodash.get(withDataState, `${incidentId}`, {});
      if (lodash.isEmpty(withDataExist)) {
        withDataState[incidentId] = {};
      }

      withDataState[incidentId] = { ...withDataExist, ...withData };
    }

    draftState.withDataState = withDataState;
  });
};

export default saveWithDataState;
