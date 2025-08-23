/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuid4 }  from 'uuid';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload: { newCertificateTable } }: any) => {
  return produce(state, (draftState: any) => {
    if (lodash.isArray(draftState.getUserManagement.userCertificateList)) {
      draftState.getUserManagement.userCertificateList.push({
        ...formUtils.cleanValidateData(newCertificateTable),
        userId: draftState.userId,
        id: uuid4(),
        positionOrder:
          lodash.last(draftState.getUserManagement.userCertificateList)?.positionOrder || 0 + 1,
      });
    }

    draftState.newCertificateTable = [];
    draftState.isRequired = false;
  });
};
