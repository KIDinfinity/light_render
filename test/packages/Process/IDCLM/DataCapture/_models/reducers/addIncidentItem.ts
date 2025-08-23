import { produce }  from 'immer';

const addIncidentItem = (state: any, action: any) => {
  const { incidentItem } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.claimProcessData.incidentList = [
      ...draftState.claimProcessData.incidentList,
      incidentItem.id,
    ];

    // eslint-disable-next-line no-param-reassign
    draftState.claimEntities.incidentListMap[incidentItem.id] = incidentItem;
  });

  return { ...nextState };
};

export default addIncidentItem;
