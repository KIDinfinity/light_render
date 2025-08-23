import { tenant } from '@/components/Tenant';
import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { formUtils } from 'basic/components/Form';
import { ExchangeType } from 'claim/pages/Enum';
import { filterExchangeRateListFn } from 'claim/pages/utils/handleExchangeRate';
import lodash from 'lodash';
import type { BeneficiaryModal, PolicyBenefitModal } from '../../_dto/Models';

export default function* updateExchangeRate(_: any, { put, select, call }: any) {
  const { claimData } = yield select(({ claimEditable, paymentAllocation }: any) => ({
    claimData: paymentAllocation.claimData,
    taskNotEditable: claimEditable.taskNotEditable,
  }));
  const { policyBenefitList, claimDecision } = claimData;
  const { payoutCurrency } = claimDecision || {};

  const systemCurrency = tenant.currency();
  const payoutCurrencyTemp = formUtils.queryValue(payoutCurrency);

  const params = {
    exchangeTypeList: [ExchangeType.External],
    fromCurrencyList: lodash.compact([systemCurrency]),
    lookupDateList: [],
    toCurrencyList: lodash.compact([systemCurrency, payoutCurrencyTemp]),
  };

  if (!lodash.isEmpty(policyBenefitList)) {
    params.fromCurrencyList = lodash
      .chain(policyBenefitList)
      .map((policyBenefit: PolicyBenefitModal) => {
        const { beneficiaryList } = policyBenefit;
        return lodash
          .chain(beneficiaryList)
          .map((beneficiary: BeneficiaryModal) => beneficiary.policyCurrency)
          .concat(formUtils.queryValue(policyBenefit?.policyCurrency))
          .compact()
          .value();
      })
      .flatten()
      .concat(params.fromCurrencyList)
      .compact()
      .reverse()
      .uniq()
      .value();

    params.toCurrencyList = lodash
      .chain(policyBenefitList)
      .map((policyBenefit: PolicyBenefitModal) => {
        const { beneficiaryList } = policyBenefit;
        return lodash
          .chain(beneficiaryList)
          .map((beneficiary: BeneficiaryModal) => beneficiary.payoutCurrency)
          .compact()
          .value();
      })
      .flatten()
      .concat(params.toCurrencyList)
      .compact()
      .reverse()
      .uniq()
      .value();
  }

  if (lodash.size(params.fromCurrencyList) === 1 && lodash.size(params.toCurrencyList) === 1) {
    const exchangeRateList = [
      {
        effectiveDate: new Date().getTime(),
        fromCurrency: params.fromCurrencyList[0],
        toCurrency: params.toCurrencyList[0],
        exchangeRate: 1,
      },
    ];
    yield put({
      type: 'saveExchangeRates',
      payload: { exchangeRateList },
    });
    yield put({
      type: 'updateRatesPayoutAmount',
      payload: { exchangeRateList },
    });
    yield put({
      type: 'getRedepositExchangeRateList',
    });
    yield put({
      type: 'updateRedepositPolicyList',
    });
    return exchangeRateList;
  } else {
    const response = yield call(getExchangeRateByCurrency, params);

    if (response && response.success && response.resultData) {
      const exchangeRateList = filterExchangeRateListFn(response.resultData);

      yield put({
        type: 'saveExchangeRates',
        payload: { exchangeRateList },
      });
      yield put({
        type: 'updateRatesPayoutAmount',
        payload: { exchangeRateList },
      });
      yield put({
        type: 'getRedepositExchangeRateList',
      });
      yield put({
        type: 'updateRedepositPolicyList',
      });
      return response;
    }
  }
}
