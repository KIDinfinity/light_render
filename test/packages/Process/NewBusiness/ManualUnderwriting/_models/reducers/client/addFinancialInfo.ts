import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { id, changedFields } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (changedFields?.ctfCountryCode?.errors) {
      draftState.modalData.addFinancial = changedFields;
      return;
    }
    const newCrtInfoId = uuidv4();
    draftState.modalData.entities.clientMap[id].crtInfoList = lodash
      .chain(draftState.modalData.entities.clientMap[id].crtInfoList)
      .concat([newCrtInfoId])
      .compact()
      .value();
    draftState.modalData.entities.crtInfoMap[newCrtInfoId] = {
      id: newCrtInfoId,
      ctfType: 'TN',
      type: 'S',
      isManuallyAdded: 1,
      ...formUtils.queryValue(changedFields),
    };
    draftState.modalData.addFinancial = {};
  });
  return { ...nextState };
};
