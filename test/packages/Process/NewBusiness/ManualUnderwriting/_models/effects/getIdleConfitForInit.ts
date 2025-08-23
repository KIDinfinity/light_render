import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

interface IParams {
  payload: {
    applicationNo: string;
    clientInfoList: any;
  };
}

export default function* ({ payload }: IParams, { put, select }: any): Generator<any, void, any> {
  const { applicationNo, clientInfoList } = payload;
  const planInfoData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.planInfoData
  );
  const { policyId, caseType } = planInfoData || {};

  yield put({
    type: `loadRegionalDefaultValueList`,
  });
  yield put({
    type: `loadUWMeLinkAge`,
  });
  yield put({
    type: `getBusinessDataSkipSnapshot`,
  });
  yield put({
    type: `getRoleDicts`,
  });
  yield put({
    type: `getRiskIndicator`,
    payload: { applicationNo },
  });
  yield put({
    type: `getExchangeRate`,
    payload: { clientInfoList },
  });
  yield put({
    type: `getIdDisplayConfigList`,
  });
  yield put({
    type: `getCfgClientValidate`,
  });
  yield put({
    type: `getDefaultValueByCode`,
    payload: {
      codeType: 'addressType',
    },
  });
  yield put({
    type: `getAllFundConfigList`,
  });
  yield put({
    type: `getCfgLoadingExclusionCopyRule`,
  });
  yield put({
    type: `getFactoringHouse`,
  });
  yield put({
    type: `getRegionalDefaultValue`,
    payload: {
      codeType: 'callNanoRetrieveProposalToken',
    },
  });
  yield put({
    type: `getNationalityList`,
  });
  yield put({
    type: `getAllAddressList`,
  });
  yield put({
    type: `getFecRiskMsg`,
    payload: {
      policyId,
    },
  });
  yield put({
    type: `getContractType`,
    payload: {
      contractType: formUtils.queryValue(caseType),
    },
  });
  yield put({
    type: `getRegionalDefaultValue`,
    payload: {
      codeType: 'supportTransferPayment',
    },
  });
  yield put({
    type: `getSearchBankCode`,
  });
  yield put({
    type: `getCfgPlanbankInfosByPaymentMode`,
  });
  yield put({
    type: `fetchFundConfigList`,
  });
  yield put({
    type: `fetchCampaignList`,
  });
  yield put({
    type: `fetchBankChannelList`,
  });
  yield put({
    type: `fetchBranchCodeList`,
  });
  yield put({
    type: `getQuestionnaireSwitch`,
  });
  yield put({
    type: `getAllReasonConfigList`,
  });
  yield put({
    type: `getExclusionList`,
  });
  yield put({
    type: `getExceptLoadingSetup`,
  });
  yield put({
    type: `getCfgPlanHospitalBenefit`,
  });
  yield put({
    type: `getDropdownList`,
  });
  yield put({
    type: `searchBankCode`,
  });
  yield put({
    type: `getCfgLoadingAllowable`,
  });
  yield put({
    type: 'getCfgOccupationInfo',
  });
  yield put({
    type: `getRefreshPaymentAmount`,
    payload: {
      init: true,
    },
  });
  yield put({
    type: 'getPlanExtraPremiumLoadingRulesList',
    payload: {
      regionCode: tenant.region(),
    },
  });
}
