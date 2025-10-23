import { produce } from 'immer';
import lodash from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default (state: any, { payload }: any) => {
  const { changedFields, id, greenCardItemId, itemId } = payload;

  const gId = greenCardItemId || uuidv4();
  const iId = itemId || uuidv4();

  const nextState = produce(state, (draftState: any) => {
    const keysOfClientInfo = [
      'newFatca',
      'countryWorkPlace',
      'provinceWorkPlace',
      'signDate',
      'usFatcaPerson',
      'firstRegisterDate',
    ];
    const nationalityInfoKey = ['nationality2', 'nationality3'];
    lodash.forEach(keysOfClientInfo, (key) => {
      if (lodash.has(changedFields, key)) {
        draftState.modalData.entities.clientMap[id][key] = lodash.get(changedFields, key);
      }
    });
    lodash.forEach(nationalityInfoKey, (key) => {
      if (lodash.has(changedFields, key)) {
        draftState.modalData.entities.clientMap[id].nationalityInfo[key] = lodash.get(
          changedFields,
          key
        );
      }
    });

    if (lodash.has(changedFields, 'ctfId') || lodash.has(changedFields, 'ctfExpireDate')) {
      if (
        !lodash
          .chain(draftState)
          .get(`modalData.entities.crtInfoMap.${iId}`, [])
          .some((item: any) => item?.ctfType === 'TN' && item?.ctfCountryCode === 'USA')
          .value()
      ) {
        lodash.set(draftState, `modalData.entities.crtInfoMap.${iId}.ctfType`, 'TN');
        lodash.set(draftState, `modalData.entities.crtInfoMap.${iId}.ctfCountryCode`, 'USA');
        lodash.set(draftState, `modalData.entities.crtInfoMap.${iId}.id`, iId);
        const crtInfoList = lodash
          .chain(draftState?.modalData.entities?.clientMap?.[id])
          .get('crtInfoList', [])
          .value();
        if (!lodash.includes(crtInfoList, iId)) {
          lodash.set(draftState, `modalData.entities.clientMap.${id}.crtInfoList`, [
            ...crtInfoList,
            iId,
          ]);
        }
        draftState.modalData.entities.clientMap[id].fatcaInfo = {
          ...draftState.modalData.entities.clientMap[id].fatcaInfo,
          ...changedFields,
        };
      }
    }

    if (
      lodash.has(changedFields, 'greenCardId') ||
      lodash.has(changedFields, 'greenCardExpireDate')
    ) {
      if (
        !lodash
          .chain(draftState)
          .get(`modalData.entities.crtInfoMap.${gId}.ctfType`)
          .isEqual('GC')
          .value()
      ) {
        lodash.set(draftState, `modalData.entities.crtInfoMap.${gId}.ctfType`, 'GC');
        lodash.set(draftState, `modalData.entities.crtInfoMap.${gId}.id`, gId);
        const crtInfoList = lodash
          .chain(draftState?.modalData.entities?.clientMap?.[id])
          .get('crtInfoList', [])
          .value();
        if (!lodash.includes(crtInfoList, gId)) {
          lodash.set(draftState, `modalData.entities.clientMap.${id}.crtInfoList`, [
            ...crtInfoList,
            gId,
          ]);
        }
      }
      draftState.modalData.entities.clientMap[id].fatcaInfo = {
        ...draftState.modalData.entities.clientMap[id].fatcaInfo,
        ...changedFields,
      };
    }
  });

  return {
    ...nextState,
  };
};
