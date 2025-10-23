import { produce } from 'immer';
import lodash from 'lodash';
import { addAddressInfo } from './addAddressInfo';
import { formUtils } from 'basic/components/Form';

const PersonalInfoFields = [
  'customerType',
  'customerRole',
  'customerEnFirstName',
  'customerEnSurname',
  'identityNo',
  'dateOfBirth',
  'gender',
];

const NationalityInfoFields = ['nationality'];

const BackgroundInfoFields = ['holdingPercentage'];

const AddressInfoFields = ['country'];

const savectfIdByIdentityNo = (params) => {
  const { draftState, id, field } = params;
  const clientCrtInfoIdList = lodash.get(
    draftState,
    `modalData.entities.clientMap.${id}.crtInfoList`
  );
  const crtInfoMap = lodash.get(draftState, `modalData.entities.crtInfoMap`);
  const clientCrtInfoList = [];
  if (lodash.isArray(clientCrtInfoIdList)) {
    clientCrtInfoIdList.forEach((item) => {
      clientCrtInfoList.push(lodash.get(crtInfoMap, item));
    });
  }
  const crtInfoTypePId = clientCrtInfoList.find((item) => item.type === 'P')?.id;
  if (crtInfoTypePId) {
    lodash.set(
      draftState,
      `modalData.entities.crtInfoMap.${crtInfoTypePId}.ctfId`,
      formUtils.queryValue(field)
    );
  }
};

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.entries(changedFields).forEach(([key, field]) => {
      if (lodash.includes(PersonalInfoFields, key)) {
        lodash.set(draftState, `modalData.entities.clientMap.${id}.personalInfo.${key}`, field);
        //修改personalInfo，需要同步修改ctfId（type=P）
        if (key === 'identityNo') {
          savectfIdByIdentityNo({ draftState, id, field });
        }
      } else if (lodash.includes(NationalityInfoFields, key)) {
        lodash.set(draftState, `modalData.entities.clientMap.${id}.nationalityInfo.${key}`, field);
      } else if (lodash.includes(BackgroundInfoFields, key)) {
        lodash.set(draftState, `modalData.entities.clientMap.${id}.backgroundInfo.${key}`, field);
      } else if (lodash.includes(AddressInfoFields, key)) {
        const addressId = draftState.modalData.entities.clientMap[id].addressInfoList?.[0];
        if (!addressId) {
          addAddressInfo(draftState, { id, changedValues: changedFields });
        } else {
          lodash.set(draftState, `modalData.entities.addressInfoMap.${addressId}.${key}`, field);
        }
      }
    });
  });

  return {
    ...nextState,
  };
};
