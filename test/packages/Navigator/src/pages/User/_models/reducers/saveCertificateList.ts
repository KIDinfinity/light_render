/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { userCertificateList } }: any) =>
  produce(state, (draftState: any) => {
    draftState.isShowAddForm = userCertificateList.length === 0;
    draftState.getUserManagement.userCertificateList = lodash.sortBy(
      userCertificateList,
      (item) => item.positionOrder
    );
    draftState.getUserManagement.originUserCertificateList = lodash.sortBy(
      userCertificateList,
      (item) => item.positionOrder
    );
  });
