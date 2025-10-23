import { produce } from 'immer';
import lodash from 'lodash';

const klipCaseInfoDelete = (state: any, action: any) => {
  const { id, incidentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.integration[incidentId].klipCaseInfoList = lodash.filter(
      draftState?.integration?.[incidentId]?.klipCaseInfoList,
      (item) => item?.id !== id
    );
  });

  return { ...nextState };
};

export default klipCaseInfoDelete;
