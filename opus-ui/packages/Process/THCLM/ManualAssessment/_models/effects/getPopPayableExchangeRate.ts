import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { tenant } from '@/components/Tenant';
import { getExchangeRateByCurrency } from '@/services/miscExchangeRateControllerService';
import { ExchangeType } from 'claim/pages/Enum';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import { divide } from '@/utils/precisionUtils';
import {
  filterExchangeRateListFn,
  mapDefaultRateRecord,
} from 'claim/pages/utils/handleExchangeRate';

export default function* getPopPayableExchangeRate(_: any, { put, select, call }: any) {
  const popUpPayable = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpPayable
  );
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );

  const { basic, benefitListMap } = formUtils.cleanValidateData(popUpPayable) || {};
  const { claimPayableListMap } = formUtils.cleanValidateData(claimEntities) || {};

  const { claimDecision } = claimProcessData || {};
  const { payoutCurrency } = formUtils.cleanValidateData(claimDecision) || {};

  const caseCurrency = payoutCurrency || tenant.currency();

  const policyCurrencyList =
    lodash
      .chain(benefitListMap || {})
      .values()
      .map((item: any) => item?.policyCurrency)
      .uniq()
      .value() || [];

  let exChangeRateList: any = [];

  if (
    (lodash.size(policyCurrencyList) === 1 && caseCurrency !== policyCurrencyList[0]) ||
    lodash.size(policyCurrencyList) > 1
  ) {
    const params = {
      exchangeTypeList: [ExchangeType.External],
      fromCurrencyList: lodash
        .chain([caseCurrency, ...policyCurrencyList])
        .uniq()
        .compact()
        .value(),
      lookupDateList: [],
      toCurrencyList: lodash
        .chain([caseCurrency, ...policyCurrencyList])
        .uniq()
        .compact()
        .value(),
    };
    // @ts-ignore
    const response: any = yield call(getExchangeRateByCurrency, params);

    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success && resultData) {
      exChangeRateList = filterExchangeRateListFn(resultData);
    }
  }

  // A/C类型操作
  const getBasePayableItem = ({ item }: any) => {
    const listMap = lodash
      .chain(item?.listMap || {})
      .values()
      .reduce((map: any, mapItem: any) => {
        if (mapItem?.isUpdate) {
          return { ...map, [mapItem?.id]: mapItem };
        }
        const supperPayable = lodash.find(claimPayableListMap, {
          incidentId: basic.incidentId,
          productCode: mapItem?.coreProductCode,
          policyNo: mapItem?.policyNo,
          benefitTypeCode: item?.benefitTypeCode,
        });

        if (!lodash.isEmpty(supperPayable)) {
          const payableItem = claimPayableListMap[supperPayable.id];
          return {
            ...map,
            [mapItem?.id]: {
              ...mapItem,
              exchangeRatePolicyPayout: payableItem?.exchangeRatePolicyPayout,
              payoutToPolicyExchangeRate: divide(1, payableItem?.exchangeRatePolicyPayout),
            },
          };
        }

        return {
          ...map,
          [mapItem?.id]: {
            ...mapItem,
            exchangeRateInvoicePolicy: 1,
            exchangeRateRecord: '',
            payoutToPolicyRate:
              lodash.find(exChangeRateList, {
                fromCurrency: caseCurrency,
                toCurrency: item?.policyCurrency,
              })?.exchangeRate || 1,
            policyToPayoutRate:
              lodash.find(exChangeRateList, {
                fromCurrency: item?.policyCurrency,
                toCurrency: caseCurrency,
              })?.exchangeRate || 1,
          },
        };
      }, {})
      .value();
    return { ...item, listMap };
  };

  const mapBenefit = {
    [eBenefitCategory.Reimbursement]: ({ item }: any) => {
      const listMap = lodash
        .chain(item?.listMap || [])
        .values()
        .reduce((map: any, mapItem: any) => {
          if (mapItem?.isUpdate) {
            return { ...map, [mapItem?.id]: mapItem };
          }
          const supperPayable = lodash.find(claimPayableListMap, {
            incidentId: basic.incidentId,
            productCode: mapItem?.coreProductCode,
            policyNo: mapItem?.policyNo,
            benefitTypeCode: item?.benefitTypeCode,
          });
          const apiExchangeRateItem = lodash.find(exChangeRateList, {
            fromCurrency: caseCurrency,
            toCurrency: item?.policyCurrency,
          });

          const apiExchangeRate = {
            exchangeRateInvoicePolicy: apiExchangeRateItem?.exchangeRate,
            exchangeRateRecord: mapDefaultRateRecord({
              fromCurrency: apiExchangeRateItem?.fromCurrency,
              toCurrency: apiExchangeRateItem?.toCurrency,
              exchangeRate: apiExchangeRateItem?.exchangeRate,
            }),
          };
          if (!lodash.isEmpty(supperPayable)) {
            const payableItem = claimPayableListMap[supperPayable.id];
            return {
              ...map,
              [mapItem?.id]: {
                ...mapItem,
                ...apiExchangeRate,
                exchangeRatePolicyPayout: payableItem?.exchangeRatePolicyPayout,
                payoutToPolicyExchangeRate: divide(1, payableItem?.exchangeRatePolicyPayout),
              },
            };
          }
          return {
            ...map,
            [mapItem?.id]: {
              ...mapItem,
              exchangeRateInvoicePolicy: 1,
              exchangeRateRecord: mapDefaultRateRecord({
                fromCurrency: caseCurrency,
                toCurrency: caseCurrency,
                exchangeRate: 1,
              }),
              payoutToPolicyRate:
                lodash.find(exChangeRateList, {
                  fromCurrency: caseCurrency,
                  toCurrency: item?.policyCurrency,
                })?.exchangeRate || 1,
              policyToPayoutRate:
                lodash.find(exChangeRateList, {
                  fromCurrency: item?.policyCurrency,
                  toCurrency: caseCurrency,
                })?.exchangeRate || 1,
            },
          };
        }, {})
        .value();

      return { ...item, listMap };
    },
    [eBenefitCategory.Aipa]: ({ item }: any) => {
      return getBasePayableItem({ item });
    },
    [eBenefitCategory.Cashless]: ({ item }: any) => {
      return getBasePayableItem({ item });
    },
  };

  const newBenefitListMap = lodash
    .chain(benefitListMap || {})
    .values()
    .reduce((listMap: any, item: any) => {
      if (lodash.isFunction(mapBenefit[item?.benefitCategory])) {
        return {
          ...listMap,
          [item?.id]: mapBenefit[item?.benefitCategory]({ item }),
        };
      }
      return { ...listMap, [item?.id]: item };
    }, {})
    .value();

  yield put({
    type: 'popUpPableUpdateBenefitListMap',
    payload: {
      benefitListMap: newBenefitListMap,
    },
  });
}
