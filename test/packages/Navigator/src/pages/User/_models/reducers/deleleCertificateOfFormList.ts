/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { id } }: any) =>
  produce(state, (draftState: any) => {
    if (lodash.isPlainObject(draftState.getUserManagement)) {
      draftState.getUserManagement.userCertificateList = lodash.filter(
        draftState.getUserManagement.userCertificateList,
        (item) => id !== item.id
      );

      // AddForm有值或者FormList为空，显示AddForm
      draftState.isShowAddForm =
        draftState.newCertificateTable.length !== 0 ||
        draftState.getUserManagement.userCertificateList.length === 0;
    }
  });
