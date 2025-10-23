import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload, validating }: any) => {
  const { changedFields, id } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.clientMap[id] = {
      ...draftState.modalData.entities.clientMap[id],
      ...changedFields,
    };

    if (validating) return;

    if (lodash.has(changedFields, 'newCrs')) {
      if (changedFields.newCrs.value === 'Y') {
        const crtInfoList = draftState.modalData.entities.clientMap[id].crtInfoList;
        const validCrtInfo = lodash
          .chain(crtInfoList)
          .map((crtId) => draftState.modalData.entities.crtInfoMap[crtId])
          .find(
            (crtInfoItem) =>
              crtInfoItem.ctfType === 'TN' &&
              crtInfoItem.ctfCountryCode !== 'USA' &&
              crtInfoItem.type === 'S'
          )
          .value();
        if (lodash.isEmpty(validCrtInfo)) {
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
          };
        }
      }
    }
  });

  return {
    ...nextState,
  };
};
