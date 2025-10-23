/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload: { isShowAddForm } }: any) =>
  produce(state, (draftState: any) => {
    draftState.isShowAddForm = isShowAddForm;
  });
