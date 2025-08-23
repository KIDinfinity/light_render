/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload: { organizationInfo } }: any) =>
  produce(state, (draftState: any) => {
    draftState.organizationInfo = organizationInfo;
  });
