/* eslint-disable no-param-reassign */
import { tenant } from '@/components/Tenant';
import { produce } from 'immer';
import lodash from 'lodash';
import { findSubTypeCodeByTransactionType } from 'process/BPSRV/common/findSubTypeCodeByTransactionType';
import { isDataCapture } from 'process/GeneralPOS/common/utils';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { transactionId, dicts, caseCategory } = payload;
    if (tenant.isTH() && draftState.processData.submissionChannel === 'OMNE') return;
    const { mainPolicyId, mainOwnerClientId } = draftState.processData?.policyInfo || {};
    const clientContact = (() => {
      if (tenant.isTH()) {
        return isDataCapture({ caseCategory })
          ? draftState.processData?.policyInfo?.clientContactList?.find(
              (item: any) => item?.clientId === mainOwnerClientId
            ) || {}
          : {};
      }
      return (
        draftState.processData?.policyInfo?.policyDespatchAddressList?.find(
          (item: any) => item?.policyId === mainPolicyId
        ) || {}
      );
    })();

    if (
      lodash.isEmpty(draftState.entities.transactionTypesMap[transactionId].contactInfo) ||
      !draftState.entities.transactionTypesMap?.[transactionId]?.contactInfo?.editFlag
    ) {
      draftState.entities.transactionTypesMap[transactionId].contactInfo = {
        homeNo: clientContact?.residenceTelNo,
        phoneNo: tenant.isTH() ? clientContact?.phoneNo : clientContact?.mobilePhoneNo,
        countryCodeOfPhoneNo: clientContact?.countryCodeOfPhoneNo,
        email: clientContact?.email,
        workNo: clientContact?.businessOfficeNo,
        clientId: clientContact?.clientId,
        subTypeCode: findSubTypeCodeByTransactionType(
          draftState.transactionTypeCodeMap,
          'SRV001',
          /contactchange/gi,
          'SRV_SUB002'
        ),
        policyId: draftState.processData.mainPolicyId,
        sourceSystem: draftState.processData.sourceSystem,
        applyTo: dicts?.map((item) => item?.dictCode),
      };
    }
  });
