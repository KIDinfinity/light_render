import { produce } from 'immer';

type TAction = {
  type: any;
  payload: {
    id: string;
  };
};

export default (state: any, action: TAction) => {
  const { id } = action.payload;
  if (!id) return state;
  const nextState = produce(state, (draftState: any) => {
    const index = draftState.modalData.takeOver.takeOverList.findIndex(
      (item: any) => item.id === id
    );
    if (index > -1) {
      draftState.modalData.takeOver.takeOverList.splice(index, 1);
    }
  });
  return { ...nextState };
};
