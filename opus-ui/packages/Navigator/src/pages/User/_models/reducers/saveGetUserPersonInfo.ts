/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload: { userPersonInfo } }: any) =>
  produce(state, (draftState: any) => {
    draftState.getUserManagement = {
      ...draftState.getUserManagement,
      userPersonInfo,
    };
  });
