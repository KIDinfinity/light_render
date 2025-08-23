import lodash from 'lodash';
import { produce }  from 'immer';
import { formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { id, changedFields } = action?.payload;
  const nextstate = produce(state, (draftState: any) => {
    const addressMapping = {
      address1: 'addressLine1',
      address2: 'addressLine2',
      address3: 'addressLine3',
      address4: 'addressLine4',
      address5: 'addressLine5',
      address6: 'addressLine6',
      country: 'countryCode',
      addrType: 'addrType',
      zipCode: 'zipCode',
    };
    const { addressList } = lodash
      .chain(draftState)
      .get('businessData.policyList[0].clientInfoList')
      .find((item: any) => item?.id === id, {})
      .pick(['addressList'])
      .value();

    const communicationLaneValue = (() => {
      if (lodash.has(changedFields, 'communicationLane')) {
        return formUtils.queryValue(lodash.get(changedFields, 'communicationLane'));
      }
      return formUtils.queryValue(
        lodash
          .chain(addressList)
          .find((item: any) => item?.communicationLane === 'Y')
          .get('addrType')
          .value()
      );
    })();
    const clientIndex = lodash
      .chain(draftState)
      .get('businessData.policyList[0].clientInfoList')
      .findIndex((item: any) => item?.id === id)
      .value();
    const isNewCommucationLane = !lodash.some(addressList, (addressItem: any) => {
      return formUtils.queryValue(addressItem.addrType) === communicationLaneValue;
    });
    if (communicationLaneValue) {
      const newAddressList = (() => {
        let originalAddress = addressList;
        if (isNewCommucationLane) {
          originalAddress = [
            ...originalAddress,
            {
              addrType: communicationLaneValue,
              communicationLane: 'Y',
            },
          ];
        }
        return lodash.map(originalAddress, (address: any) => {
          return {
            ...address,
            communicationLane:
              formUtils.queryValue(address?.addrType) === communicationLaneValue ? 'Y' : 'N',
          };
        });
      })();

      lodash.set(
        draftState,
        `businessData.policyList[0].clientInfoList[${clientIndex}].addressList`,
        newAddressList
      );

      const policyAddressMap = new Map();

      lodash
        .chain(newAddressList)
        .find((address: any) => formUtils.queryValue(address.addrType) === communicationLaneValue)
        .entries()
        .forEach(([key, value]: any) => {
          if (/(address[1-7])|(zipCode)|(addrType)|(country)/.test(key)) {
            policyAddressMap.set(addressMapping[key], value);
          }
        })
        .value();

      const originalPolicyAddress = lodash.get(
        draftState,
        `businessData.policyList[0].policyAddressList[0]`
      );

      const newPolicyAddress = (() => {
        if (
          lodash.some(
            addressList,
            (address: any) => formUtils.queryValue(address.addrType) === communicationLaneValue
          )
        ) {
          return {
            ...originalPolicyAddress,
            id: originalPolicyAddress?.id || uuidv4(),
            ...Object.fromEntries(policyAddressMap),
          };
        } else {
          return {
            id: originalPolicyAddress?.id || uuidv4(),
            ...Object.fromEntries(policyAddressMap),
          };
        }
      })();
      lodash.set(draftState, `businessData.policyList[0].policyAddressList[0]`, newPolicyAddress);
    }
  });

  return nextstate;
};
