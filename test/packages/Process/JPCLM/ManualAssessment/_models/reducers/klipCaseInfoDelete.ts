import { produce }  from 'immer';
import lodash from 'lodash';

const klipCaseInfoDelete = (state: any, action: any) => {
  const { id, incidentId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.incidentListMap[incidentId].klipCaseInfoList = lodash.filter(
      draftState?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList,
      (item) => item?.id !== id
    );
  });

  return { ...nextState };
};

export default klipCaseInfoDelete;
