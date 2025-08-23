/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload: { changedFields, id } }: any) =>
  produce(state, (draftState: any) => {
    draftState.getUserManagement.userCertificateList = lodash.map(
      draftState.getUserManagement.userCertificateList,
      (item) => {
        if (item.id === id) {
          return {
            ...item,
            ...changedFields,
          };
        }
        return item;
      }
    );
  });
