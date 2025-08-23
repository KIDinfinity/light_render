import { produce } from 'immer';
import lodash from 'lodash';

import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { changedFields, id, crtId, validating } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.entities.crtInfoMap[crtId] = {
      ...draftState.modalData.entities.crtInfoMap[crtId],
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1) {
      const crtInfoList = draftState.modalData.entities.clientMap[id].crtInfoList;
      const crtInfoMapList = lodash.map(crtInfoList, (crtId) => {
        return draftState.modalData.entities.crtInfoMap[crtId];
      });

      tenant.region({
        [Region.ID]: () => {
          const targetkeys = ['ctfCountryCode', 'ctfId', 'reason'];
          if (lodash.some(targetkeys, (key) => lodash.has(changedFields, key))) {
            draftState.modalData.entities.clientMap[id].financialInfo = {
              ...draftState.modalData.entities.clientMap[id].financialInfo,
              usTaxFlag: lodash.some(crtInfoMapList, (crtInfoItem) =>
                lodash.some(targetkeys, (key) => !!formUtils.queryValue(crtInfoItem?.[key]))
              )
                ? 'Y'
                : 'N',
            };
          }
        },
        notMatch: () => {
          const targetMap = [
            { key: 'ctfType', value: 'TN' },
            { key: 'ctfCountryCode', value: 'USA' },
          ];

          if (lodash.some(targetMap, (item) => lodash.has(changedFields, item.key))) {
            draftState.modalData.entities.clientMap[id].financialInfo = {
              ...draftState.modalData.entities.clientMap[id].financialInfo,
              usTaxFlag: lodash.some(crtInfoMapList, (crtInfoItem) =>
                lodash.every(
                  targetMap,
                  (item) => formUtils.queryValue(crtInfoItem?.[item.key]) === item.value
                )
              )
                ? 'Y'
                : 'N',
            };
          }
        },
      });
    }
  });

  return {
    ...nextState,
  };
};
