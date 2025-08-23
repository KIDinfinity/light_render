import { produce } from 'immer';

const saveServiceItemBreakdownList = (state: any, { payload: { serviceItemId } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimEntities.serviceItemListMap[serviceItemId].claimServiceItemBreakDownList = [
      ...(state?.claimServiceItemBreakDownList || []),
    ];
  });

  return { ...nextState };
};

export default saveServiceItemBreakdownList;
