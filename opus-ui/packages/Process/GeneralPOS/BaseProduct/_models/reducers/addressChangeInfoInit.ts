/* eslint-disable no-param-reassign */
import { tenant } from '@/components/Tenant';
import { produce } from 'immer';
import lodash from 'lodash';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, dicts } = payload;
    const mainPolicyId = draftState.processData?.policyInfo?.mainPolicyId;
    if (tenant.isTH()) return;
    const clientContact = tenant.isTH()
      ? draftState.entities.transactionTypesMap?.[transactionId]?.policyAddr
      : draftState.processData?.policyInfo?.policyDespatchAddressList?.find(
          (item) => item?.policyId === mainPolicyId
        ) || {};
    if (
      lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId].policyAddr) ||
      !draftState.entities.transactionTypesMap?.[transactionId]?.policyAddr?.editFlag
    ) {
      draftState.entities.transactionTypesMap[transactionId].policyAddr = {
        addressLine1: clientContact?.dispatchAddress01,
        addressLine2: clientContact?.dispatchAddress02,
        addressLine3: clientContact?.dispatchAddress03,
        addressLine4: clientContact?.dispatchAddress04,
        addressLine5: clientContact?.dispatchAddress05,
        zipCode: clientContact?.dispatchZipCode,
        preferredMailingAddress: clientContact?.preferredMailingAddress,
        email: clientContact?.emailAddress,
        clientId: clientContact?.clientId,
        subTypeCode: findSubTypeCodeByTransactionType(
          draftState.transactionTypeCodeMap,
          'SRV001',
          /addresschange/gi,
          'SRV_SUB001'
        ),
        policyId: draftState.processData.mainPolicyId,
        sourceSystem: draftState.processData.sourceSystem,
        applyTo: dicts?.map((item) => item?.dictCode),
      };
    }
  });
