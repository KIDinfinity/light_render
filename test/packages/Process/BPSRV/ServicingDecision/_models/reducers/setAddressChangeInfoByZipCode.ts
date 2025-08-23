/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id, address } = payload;

    if (!draftState.entities.transactionTypesMap[id].policyAddr) {
      draftState.entities.transactionTypesMap[id].policyAddr = {};
    }

    if (lodash.isPlainObject(draftState.entities.transactionTypesMap[id]?.policyAddr.countryCode)) {
      draftState.entities.transactionTypesMap[id].policyAddr.countryCode = {
        ...draftState.entities.transactionTypesMap[id].policyAddr.countryCode,
        value: address?.countryCode,
      };
    } else {
      draftState.entities.transactionTypesMap[id].policyAddr.countryCode = address?.countryCode;
    }

    if (
      lodash.isPlainObject(draftState.entities.transactionTypesMap[id]?.policyAddr.addressLine5)
    ) {
      draftState.entities.transactionTypesMap[id].policyAddr.addressLine5 = {
        ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine5,
        value: address?.provinceCode,
      };
    } else {
      draftState.entities.transactionTypesMap[id].policyAddr.addressLine5 = address?.provinceCode;
    }

    if (
      lodash.isPlainObject(draftState.entities.transactionTypesMap[id]?.policyAddr.addressLine4)
    ) {
      draftState.entities.transactionTypesMap[id].policyAddr.addressLine4 = {
        ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine4,
        value: address?.districtCode,
      };
    } else {
      draftState.entities.transactionTypesMap[id].policyAddr.addressLine4 = address?.districtCode;
    }
  });
