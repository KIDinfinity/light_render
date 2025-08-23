import { produce }  from 'immer';
import lodash from 'lodash';

const addNewEditRule = (state: any, action: any) => {
  const { libraryItem, type } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    const emptyItem = lodash.find(
      draftState.editData[type],
      (item: any) => lodash.isEmpty(item.atomCode) && lodash.isEmpty(item.operator)
    );

    draftState.editData[type] = !lodash.isEmpty(emptyItem)
      ? draftState.editData[type].map((item: any) => {
          return emptyItem.id === item.id ? libraryItem : item;
        })
      : lodash.concat(draftState.editData[type], [libraryItem]);
  });

  return { ...nextState };
};

export default addNewEditRule;
