import lodash from 'lodash';
import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { getPremBankAccount } from '../functions';

export default function* getPremBankAccounts(_: any, { call, put, select }: any) {
  const { insuredInfo, premBankAccount } = yield select((state: any) => ({
    insuredInfo: state.JPCLMOfDataCapture.claimProcessData.insured,
    premBankAccount: state.JPCLMOfDataCapture.premBankAccount,
  }));

  if (!lodash.isEmpty(premBankAccount)) return premBankAccount;

  const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
  const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
  const params = {
    insured: { insuredId, policyId },
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    const premBankAccountTemp = getPremBankAccount(
      resultData?.clientBankAccountList,
      formUtils.queryValue(policyId)
    );

    yield put({
      type: 'policyListUpdate',
      payload: { policyContractList: response?.resultData?.policyContractList || [] },
    });

    yield put({
      type: 'savePremBankAccount',
      payload: {
        premBankAccount: premBankAccountTemp,
      },
    });

    return premBankAccountTemp;
  }
}
