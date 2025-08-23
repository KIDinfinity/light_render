import { listExchangeRateByEffectiveDate } from '@/services/miscExchangeRateControllerService';
import { safeParseUtil } from '@/utils/utils';
import { ExchangeType } from 'claim/pages/Enum';
import lodash from 'lodash';
import type { PayeeModal } from '../../_dto/Models';
type CurrencyParam = {
  toCurrency?: string;
  exchangeType?: string;
  fromCurrency?: string;
  effectiveDate?: string;
  exchangeRate?: number;
};
type OwnerCurrency = {
  policyCurrency: string;
  policyId: string;
};

export default function* getRedepositExchangeRateList(_: any, { put, select, call }: any) {
  const { claimData, ownerPolicyMap, currencies } = yield select(({ paymentAllocation }: any) => ({
    claimData: paymentAllocation.claimData,
    ownerPolicyMap: paymentAllocation.ownerPolicyMap,
    currencies: paymentAllocation.currencies,
  }));
  const { payeeList, policyBenefitList } = claimData;
  // const get payout exchange rate effectiveDate
  const exchangeRateRecord = lodash.get(
    policyBenefitList?.[0],
    'beneficiaryList[0].exchangeRateRecord'
  );
  const exchangeRateRecordValue = safeParseUtil(exchangeRateRecord);
  const beneficiaryExchangeRateEffectiveDate = exchangeRateRecordValue?.[0]?.effectiveDate;
  console.log(
    'beneficiaryExchangeRateEffectiveDate',
    beneficiaryExchangeRateEffectiveDate,
    exchangeRateRecordValue
  );
  const effectiveDate = beneficiaryExchangeRateEffectiveDate || new Date().toISOString();

  // refresh redeposited currency's get exchange params
  const redepositedCurrencyGetExchangeRateParams: CurrencyParam[] = lodash
    .chain<PayeeModal>(payeeList)
    .map((payeeItem) =>
      lodash.map(payeeItem.claimRedepositList, (redepositItem) => {
        return lodash.map(currencies, (currency) => {
          return {
            toCurrency: redepositItem.redepositPolicyCurrency,
            exchangeType: ExchangeType.External,
            fromCurrency: currency.currencyCode,
            effectiveDate,
          };
        });
      })
    )
    .flatten()
    .flatten()
    .compact()
    .uniq()
    .value();

  // potential redeposit currency's get exchange params
  const potentialCurrencyGetExchangeRateParams: CurrencyParam[] = lodash
    .chain<OwnerCurrency[]>(ownerPolicyMap)
    .map((policyList) => {
      return lodash.map(currencies, (currency) => {
        return lodash.map(policyList, (policyItem) => ({
          toCurrency: policyItem.policyCurrency,
          exchangeType: ExchangeType.External,
          fromCurrency: currency.currencyCode,
          effectiveDate,
        }));
      });
    })
    .flatten()
    .flatten()
    .compact()
    .uniq()
    .value();

  const params = lodash
    .chain([...redepositedCurrencyGetExchangeRateParams, ...potentialCurrencyGetExchangeRateParams])
    .compact()
    .uniqBy((item) => ' ' + item.toCurrency + item.fromCurrency + item.effectiveDate)
    .value();

  // @ts-ignore
  const response = yield call(listExchangeRateByEffectiveDate, params);
  if (response && response.success && response.resultData) {
    const sameFromToList: CurrencyParam[] = params
      .filter((item) => item.fromCurrency === item.toCurrency)
      .map((item) => ({
        ...item,
        exchangeRate: 1.0,
      }));

    const redepositExchangeRateList = lodash
      .chain<CurrencyParam>(response.resultData)
      .filter((item) => item.fromCurrency !== item.toCurrency)
      .map((item) => {
        return lodash.pick(item, [
          'effectiveDate',
          'toCurrency',
          'exchangeRate',
          'exchangeType',
          'fromCurrency',
        ]);
      })
      .concat(sameFromToList)
      .value();
    yield put({
      type: 'saveRedepositExchangeRateList',
      payload: {
        redepositExchangeRateList,
      },
    });
  }
}
