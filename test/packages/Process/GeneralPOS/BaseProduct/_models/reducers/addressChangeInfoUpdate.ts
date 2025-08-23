/* eslint-disable no-param-reassign */
import { produce }  from 'immer';
import findSubTypeCodeByTransactionType from 'process/BPSRV/common/findSubTypeCodeByTransactionType';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, changedFields, validating } = payload;
    const { address } = state;
    const transactionPath = `entities.transactionTypesMap[${transactionId}]`;

    draftState.entities.transactionTypesMap[transactionId].policyAddr = {
      ...draftState.entities.transactionTypesMap[transactionId].policyAddr,
      ...changedFields,
    };

    draftState.entities.transactionTypesMap[transactionId].policyAddr = {
      ...draftState.entities.transactionTypesMap[transactionId].policyAddr,
      subTypeCode: findSubTypeCodeByTransactionType(
        draftState.transactionTypeCodeMap,
        'SRV001',
        /addresschange/gi,
        'SRV_SUB001'
      ),
      policyId: draftState.processData.mainPolicyId,
      sourceSystem: draftState.processData.sourceSystem,
    };

    if (!validating) {
      draftState.entities.transactionTypesMap[transactionId].policyAddr.editFlag = 1;
      lodash.set(
        draftState,
        `${transactionPath}.transactionTypeCode`,
        formUtils.queryValue(lodash.get(draftState, `${transactionPath}.transactionTypeCode`))
      );
      if (lodash.has(changedFields, 'addressLine5') && tenant.isPH()) {
        draftState.entities.transactionTypesMap[transactionId].policyAddr.countryCode =
          changedFields.addressLine5;
      }
      const clearZipCode = (() => {
        const countryCodeIsTh =
          formUtils.queryValue(
            lodash.get(
              draftState,
              `entities.transactionTypesMap[${transactionId}].policyAddr.countryCode`
            )
          ) === 'TH';
        const isTargetField = lodash.includes(
          ['addressLine5', 'addressLine4', 'addressLine3', 'countryCode'],
          lodash.chain(changedFields).keys().first().value()
        );
        return countryCodeIsTh && isTargetField;
      })();
      if (tenant.isTH() && clearZipCode) {
        draftState.entities.transactionTypesMap[transactionId].policyAddr.zipCode = null;
      }
      if (lodash.has(changedFields, 'addressLine3') && tenant.isTH()) {
        const district = formUtils.queryValue(
          lodash.get(
            draftState,
            `entities.transactionTypesMap[${transactionId}].policyAddr.addressLine4`
          )
        );
        const city = formUtils.queryValue(
          lodash.get(
            draftState,
            `entities.transactionTypesMap[${transactionId}].policyAddr.addressLine3`
          )
        );
        const zipCode = lodash
          .chain(address)
          .get(`city.${district}`)
          .find((item: any) => item.code === city)
          .get('postalCode')
          .value();
        draftState.entities.transactionTypesMap[transactionId].policyAddr.zipCode = zipCode;
      }
    }
  });
