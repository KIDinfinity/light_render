import { produce }  from 'immer';
import lodash from 'lodash';

const removeLibraryList = (state: any, action: any) => {
  const { id } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.libraryList = lodash.map(draftState.libraryList, (item: any) => {
      return id === item.id
        ? {
            ...item,
            active: false,
          }
        : item;
    });
  });

  return { ...nextState };
};

export default removeLibraryList;
