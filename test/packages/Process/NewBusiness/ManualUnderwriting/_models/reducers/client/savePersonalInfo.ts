import { Region, tenant } from '@/components/Tenant';
import bmi from '@/utils/bmi';
import { formUtils } from 'basic/components/Form';
import { produce } from 'immer';
import lodash from 'lodash';
import Gander from 'process/NewBusiness/Enum/Gander';

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'height') || lodash.has(changedFields, 'weight')) {
        const weight = lodash.has(changedFields, 'weight')
          ? formUtils.queryValue(changedFields?.weight)
          : formUtils.queryValue(
              lodash.get(draftState, `modalData.entities.clientMap[${id}].personalInfo.weight`)
            );
        const height = lodash.has(changedFields, 'height')
          ? formUtils.queryValue(changedFields?.height)
          : formUtils.queryValue(
              lodash.get(draftState, `modalData.entities.clientMap[${id}].personalInfo.height`)
            );
        if (+height && +weight) {
          changedFields.bmi = bmi({ height, weight });
        } else {
          changedFields.bmi = 0;
        }
      }
      if (lodash.has(changedFields, 'gender') && Region.ID === tenant.region()) {
        const gender = formUtils.queryValue(changedFields?.gender);
        const changeMap = {
          [Gander.Male]: 'BAPAK',
          [Gander.Female]: 'IBU',
        };
        changedFields.title = changeMap?.[formUtils.queryValue(gender)] || '';
      }
      if (
        lodash.has(changedFields, 'beneficiaryType') &&
        formUtils.queryValue(changedFields?.beneficiaryType) === 'TB'
      ) {
        changedFields.share = 0;
      }
      if (lodash.has(changedFields, 'identityType')) {
        changedFields.identityNo = '';
        changedFields.ctfStartDate = '';
        changedFields.expiryDate = '';
      }
    }

    draftState.modalData.entities.clientMap[id].personalInfo = {
      ...draftState.modalData.entities?.clientMap[id]?.personalInfo,
      ...changedFields,
    };
  });

  return {
    ...nextState,
  };
};
