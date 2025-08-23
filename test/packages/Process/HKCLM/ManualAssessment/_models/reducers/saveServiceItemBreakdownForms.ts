import { produce }  from 'immer';

const saveServiceItemBreakdownForms = (state: any, { payload: { form } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    draftState.serviceItemBreakdownForms = [...(state.serviceItemBreakdownForms || []), form];
  });

  return { ...nextState };
};

export default saveServiceItemBreakdownForms;
