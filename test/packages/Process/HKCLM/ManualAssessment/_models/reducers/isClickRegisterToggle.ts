import { produce }  from 'immer';

export default (state: any, action: any) =>
  produce(state, (draftState: any) => {
    draftState.isClickRegister = !!action.payload;
  });
