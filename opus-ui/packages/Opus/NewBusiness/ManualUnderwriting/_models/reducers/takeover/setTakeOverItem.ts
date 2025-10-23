import { produce } from 'immer';

type TAction = {
  type: any;
  payload: { id: any; changedFields: any };
};

export default (state: any, action: TAction) => {
  const { id } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const index = draftState.modalData.takeOver.takeOverList.findIndex((item: any) => {
      return item?.id === id;
    });

    if (index > -1) {
      draftState.modalData.takeOver.takeOverList[index] = {
        ...draftState.modalData.takeOver.takeOverList[index],
        ...action.payload.changedFields,
      };
    }
  });
  return { ...nextState };
};
