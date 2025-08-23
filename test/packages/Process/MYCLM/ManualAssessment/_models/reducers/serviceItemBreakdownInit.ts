import { produce } from 'immer';

const serviceItemBreakdownInit = (state: any, { payload: { serviceItemId } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.claimServiceItemBreakDownList = [
      ...(draftState.claimEntities.serviceItemListMap[serviceItemId]
        ?.claimServiceItemBreakDownList || []),
    ];
    draftState.isShowServiceItemBreakdown = true;
  });

  return { ...nextState };
};

export default serviceItemBreakdownInit;
