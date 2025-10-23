import { produce } from 'immer';

const saveImportList = (state: any, action: any) => {
  const { dataSource } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.dataSource = dataSource;
  });
  return nextState;
};


export default saveImportList
