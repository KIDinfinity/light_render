/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any) =>
  produce(state, (draftState: any) => {
    draftState.isShowAddForm = !state.getUserManagement.userCertificateList?.length;
    draftState.newCertificateTable = [];
    draftState.isRequired = false;
  });
