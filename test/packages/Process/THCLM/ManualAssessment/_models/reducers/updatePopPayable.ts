import { produce }  from 'immer';

const updatePopPayable = (state: any, { payload }: any) => {
  const { popUpPayable } = payload;
  return produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.popUpPayable = {
      ...draftState.popUpPayable,
      ...popUpPayable,
    };
  });
};

export default updatePopPayable;
