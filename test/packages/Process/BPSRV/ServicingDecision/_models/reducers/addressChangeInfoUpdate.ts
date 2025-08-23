/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import findSubTypeCodeByTransactionType from 'process/BPSRV/common/findSubTypeCodeByTransactionType';
import { tenant, Region } from '@/components/Tenant';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { id, changedFields } = payload;
    draftState.entities.transactionTypesMap[id].policyAddr = {
      ...draftState.entities.transactionTypesMap[id].policyAddr,
      ...changedFields,
    };

    if (lodash.size(changedFields) === 1 && tenant.region() !== Region.ID) {
      if (lodash.has(changedFields, 'countryCode')) {
        if (
          lodash.isPlainObject(draftState.entities.transactionTypesMap[id].policyAddr.addressLine5)
        ) {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine5 = {
            ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine5,
            value: null,
          };
        } else {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine5 = null;
        }

        if (
          lodash.isPlainObject(draftState.entities.transactionTypesMap[id].policyAddr.addressLine4)
        ) {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine4 = {
            ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine4,
            value: null,
          };
        } else {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine4 = null;
        }

        if (
          lodash.isPlainObject(draftState.entities.transactionTypesMap[id].policyAddr.addressLine3)
        ) {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine3 = {
            ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine3,
            value: null,
          };
        } else {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine3 = null;
        }
      }

      if (lodash.has(changedFields, 'addressLine5')) {
        if (
          lodash.isPlainObject(draftState.entities.transactionTypesMap[id].policyAddr.addressLine4)
        ) {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine4 = {
            ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine4,
            value: null,
          };
        } else {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine4 = null;
        }

        if (
          lodash.isPlainObject(draftState.entities.transactionTypesMap[id].policyAddr.addressLine3)
        ) {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine3 = {
            ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine3,
            value: null,
          };
        } else {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine3 = null;
        }
      }

      if (lodash.has(changedFields, 'addressLine4')) {
        if (
          lodash.isPlainObject(draftState.entities.transactionTypesMap[id].policyAddr.addressLine3)
        ) {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine3 = {
            ...draftState.entities.transactionTypesMap[id].policyAddr.addressLine3,
            value: null,
          };
        } else {
          draftState.entities.transactionTypesMap[id].policyAddr.addressLine3 = null;
        }
      }
    }

    if (
      !lodash.some(
        lodash.toPairs(draftState.entities.transactionTypesMap[id].policyAddr),
        ([key, obj]: any) =>
          [
            'addressLine1',
            'addressLine2',
            'addressLine3',
            'addressLine4',
            'addressLine5',
            'countryCode',
            'zipCode',
            'addressType',
          ].includes(key) && formUtils.queryValue(obj)
      )
    ) {
      draftState.entities.transactionTypesMap[id].policyAddr = null;
    } else {
      draftState.entities.transactionTypesMap[id].policyAddr = {
        ...draftState.entities.transactionTypesMap[id].policyAddr,
        subTypeCode: findSubTypeCodeByTransactionType(
          draftState.transactionTypeCodeMap,
          'SRV001',
          /addresschange/gi,
          'SRV_SUB001'
        ),
        policyId: draftState.processData.mainPolicyId,
        sourceSystem: draftState.processData.sourceSystem,
      };
    }
  });
