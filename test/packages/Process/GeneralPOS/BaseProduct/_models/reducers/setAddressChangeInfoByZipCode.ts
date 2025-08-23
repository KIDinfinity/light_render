/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, address } = payload;

    if (lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId]?.policyAddr)) {
      draftState.entities.transactionTypesMap[transactionId].policyAddr = {};
    }

    if (lodash.isPlainObject(draftState.entities.transactionTypesMap[transactionId]?.policyAddr.countryCode)) {
      draftState.entities.transactionTypesMap[transactionId].policyAddr.countryCode = {
        ...draftState.entities.transactionTypesMap[transactionId].policyAddr.countryCode,
        value: address?.countryCode,
      };
    } else {
      draftState.entities.transactionTypesMap[transactionId].policyAddr.countryCode = address?.countryCode;
    }

    if (
      lodash.isPlainObject(draftState.entities.transactionTypesMap[transactionId]?.policyAddr.addressLine5)
    ) {
      draftState.entities.transactionTypesMap[transactionId].policyAddr.addressLine5 = {
        ...draftState.entities.transactionTypesMap[transactionId].policyAddr.addressLine5,
        value: address?.provinceCode,
      };
    } else {
      draftState.entities.transactionTypesMap[transactionId].policyAddr.addressLine5 = address?.provinceCode;
    }

    if (
      lodash.isPlainObject(draftState.entities.transactionTypesMap[transactionId]?.policyAddr.addressLine4)
    ) {
      draftState.entities.transactionTypesMap[transactionId].policyAddr.addressLine4 = {
        ...draftState.entities.transactionTypesMap[transactionId].policyAddr.addressLine4,
        value: address?.districtCode,
      };
    } else {
      draftState.entities.transactionTypesMap[transactionId].policyAddr.addressLine4 = address?.districtCode;
    }
  });
