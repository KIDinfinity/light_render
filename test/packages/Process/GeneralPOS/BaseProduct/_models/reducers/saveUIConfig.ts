import { produce }  from 'immer';

const saveUIConfig = (state: any, action: any) => {
  const { UIConfig } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.UIConfig = UIConfig;
  });

  return { ...nextState };
};

export default saveUIConfig;
