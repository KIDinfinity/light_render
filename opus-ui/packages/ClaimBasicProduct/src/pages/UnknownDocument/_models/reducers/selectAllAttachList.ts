import lodash from 'lodash';
import { produce } from 'immer';

const addSubmitUdParam = (state: any, action: any) => {
  const { unknownDocList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const newList = lodash.map(unknownDocList, (item: any) => {
      return {
        udDocId: item.docId,
      };
    });
    draftState.attachList = [...draftState.attachList, ...newList];
  });

  return { ...nextState };
};

export default addSubmitUdParam;
