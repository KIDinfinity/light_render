import { produce } from 'immer';
import lodash from 'lodash';
import { addAddressInfo } from './addAddressInfo';

const PersonalInfoFields = [
  'customerType',
  'customerRole',
  'customerEnFirstName',
  'customerEnSurname',
  'identityNo',
  'dateOfBirth',
];

const NationalityInfoFields = ['nationality'];

const AddressInfoFields = [
  'address1',
  'address2',
  'address3',
  'address4',
  'address5',
  'address6',
  'country',
  'addrType',
  'zipCode',
];

export default (state: any, { payload }: any) => {
  const { changedFields, id } = payload;

  if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'country')) {
    const pathNeedToBeCleared = [
      'address6',
      'address5',
      'address4',
      'address3',
      'address2',
      'address1',
      'zipCode',
    ];
    lodash.forEach(pathNeedToBeCleared, (value) => {
      changedFields[value] = '';
    });
  }
  const nextState = produce(state, (draftState: any) => {
    lodash.entries(changedFields).forEach(([key, field]) => {
      if (lodash.includes(PersonalInfoFields, key)) {
        lodash.set(draftState, `modalData.entities.clientMap.${id}.personalInfo.${key}`, field);
      } else if (lodash.includes(NationalityInfoFields, key)) {
        lodash.set(draftState, `modalData.entities.clientMap.${id}.nationalityInfo.${key}`, field);
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
