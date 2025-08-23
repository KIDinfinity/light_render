import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { transConfig } from 'process/NewBusiness/ManualUnderwriting/_hooks/data.trans.config';
import { matchValueByTransConfig } from 'process/NewBusiness/ManualUnderwriting/_utils';

export default (state: any, { payload }: any) => {
  const { changedFields, id, validating } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (
        lodash.has(changedFields, 'nationality') &&
        formUtils.queryValue(changedFields?.nationality) == 'RI' &&
        tenant.isID()
      ) {
        draftState.modalData.entities.clientMap[id].personalInfo = {
          ...draftState.modalData.entities?.clientMap[id]?.personalInfo,
          SecondaryIdentityExpiryDate: '',
          SecondaryIdentityNo: '',
          SecondaryIdentityType: '',
        };

        let crtId: string = '';
        lodash.forEach(draftState.modalData.entities.crtInfoMap, (item, temId) => {
          if (
            (matchValueByTransConfig({
              key: 'SecondaryIdentityNo',
              item: { crtInfoList: [item] },
              path: lodash.get(transConfig, 'SecondaryIdentityNo'),
            }) ||
              matchValueByTransConfig({
                key: 'SecondaryIdentityType',
                item: { crtInfoList: [item] },
                path: lodash.get(transConfig, 'SecondaryIdentityType'),
              })) &&
            item.clienId === id
          ) {
            crtId = temId;
          }
        });
        draftState.modalData.entities.clientMap[id].crtInfoList =
          draftState.modalData.entities.clientMap[id].crtInfoList.filter(
            (temId: string) => temId !== crtId
          );
        delete draftState.modalData.entities.crtInfoMap[crtId];
      }
      if (lodash.has(changedFields, 'ctfCountryCode')) {
        const pathNeedToBeCleared = ['ctfPlace', 'ctfCity'];
        lodash.forEach(pathNeedToBeCleared, (value) => {
          changedFields[value] = '';
        });
      }
    }

    draftState.modalData.entities.clientMap[id].nationalityInfo = {
      ...draftState.modalData.entities.clientMap[id].nationalityInfo,
      ...changedFields,
    };
  });

  return {
    ...nextState,
  };
};
