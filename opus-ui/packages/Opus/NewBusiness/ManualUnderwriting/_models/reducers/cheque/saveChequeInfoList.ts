import { produce } from 'immer';
import lodash from 'lodash';

// TODO:这里把change和整个list保存放在一起了，之后需要分开
export default (state: any, action: any) => {
  const { chequeInfoList, id, changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    if (!!id && !!changedFields) {
      draftState.modalData.processData.chequeInfoList = lodash
        .chain(draftState.modalData.processData.chequeInfoList)
        .map((el: any) => {
          return el.id === id ? { ...el, ...changedFields } : el;
        })
        .value();
    } else {
      draftState.modalData.processData.chequeInfoList = chequeInfoList;
      draftState.processData.chequeInfoList = chequeInfoList;
    }
  });
  return {
    ...nextState,
  };
};
