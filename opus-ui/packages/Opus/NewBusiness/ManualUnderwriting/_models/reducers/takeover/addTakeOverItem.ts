import { produce } from 'immer';
import { v4 as uuid } from 'uuid';

export default (state: any, { payload }: any) => {
  const { changedValues } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.takeOver.takeOverList = [
      ...(draftState.modalData.takeOver.takeOverList || []),
      { id: uuid(), ...changedValues },
    ];
  });
  return { ...nextState };
};
