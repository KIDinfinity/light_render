import { produce }  from 'immer';
import lodash from 'lodash';

const saveServiceItemBreakdown = (
  state: any,
  { payload: { serviceItemBreakdownId, changedFields } }: any
) => {
  const nextState = produce(state, (draftState: any) => {
    const serviceItemBreakIndex = lodash.findIndex(draftState.claimServiceItemBreakDownList, [
      'id',
      serviceItemBreakdownId,
    ]);
    draftState.claimServiceItemBreakDownList[serviceItemBreakIndex] = {
      ...(state.claimServiceItemBreakDownList?.[serviceItemBreakIndex] || []),
      ...changedFields,
    };
  });

  return { ...nextState };
};

export default saveServiceItemBreakdown;
