import { produce } from 'immer';

const saveSQL = (state: any, action: any) => {
  const { sql } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    // eslint-disable-next-line no-param-reassign
    draftState.sql = sql;
  });
  return nextState;
};


export default saveSQL
