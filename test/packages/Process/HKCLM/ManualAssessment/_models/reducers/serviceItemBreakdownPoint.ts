import { produce }  from 'immer';

const serviceItemBreakdownPoint = (state: any, { payload }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.serviceItemBreakdownPoint = {
      ...(draftState.serviceItemBreakdownPoint || {}),
      ...payload,
    };
  });

  return { ...nextState };
};

export default serviceItemBreakdownPoint;
