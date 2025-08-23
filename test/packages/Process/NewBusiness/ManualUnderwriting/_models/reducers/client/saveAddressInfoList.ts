import { produce } from 'immer';
import lodash from 'lodash';
import { AddressType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) => {
  const { changedFields, addressId, id } = payload;
  const nextState = produce(state, (draftState: any) => {
    if (lodash.size(changedFields) === 1) {
      if (lodash.has(changedFields, 'country')) {
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
    }
    draftState.modalData.entities.addressInfoMap[addressId] = {
      ...draftState.modalData.entities.addressInfoMap[addressId],
      ...changedFields,
    };

    if (lodash.has(changedFields, 'country') || lodash.has(changedFields, 'addrType')) {
      const countryMap: Partial<Record<AddressType, string>> = {};
      const addressInfoList = lodash.get(
        draftState.modalData.entities,
        `clientMap[${id}].addressInfoList`,
        []
      );
      lodash.forEach(addressInfoList, (addressId1) => {
        const addressInfo = lodash.get(
          draftState.modalData.entities,
          `addressInfoMap[${addressId1}]`,
          {}
        );
        const addrType = formUtils.queryValue(addressInfo.addrType);
        if (addrType) {
          countryMap[addrType as AddressType] = formUtils.queryValue(addressInfo.country);
        }
      });

      const country = countryMap[AddressType.Residence] || countryMap[AddressType.Current];

      if (country) {
        lodash.set(
          draftState.modalData.entities,
          `clientMap[${id}].nationalityInfo.countryOfResident`,
          country
        );
      }
    }
  });

  return {
    ...nextState,
  };
};
