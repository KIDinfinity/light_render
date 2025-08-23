import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

import { tenant } from '@/components/Tenant';
import { ExchangeType } from 'claim/pages/Enum';
import { BenefitCategoryEnum } from 'process/Utils/benefitCategoryUtils';
import { formUtils } from 'basic/components/Form';
import { divide } from '@/utils/precisionUtils';
import {
  mapDefaultRateRecord,
  filterAllExchangeRates
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
  const exchangeRate = yield select(  ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.exchangeRate)
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
    const param = {
      exchangeType: ExchangeType.External,
      currencyList: lodash
        .chain([caseCurrency, ...policyCurrencyList])
        .uniq()
        .compact()
        .value(),
      }
    // @ts-ignore
      exChangeRateList = filterAllExchangeRates(exchangeRate,param)
  }

  // A/C类型操作
  const getBasePayableItem = ({ item }: any) => {
    // if (item?.isUpdate) return item;

    const supperPayable = lodash.find(claimPayableListMap, {
      incidentId: basic.incidentId,
      productCode: item?.coreProductCode,
      policyNo: item?.policyNo,
      benefitTypeCode: item?.benefitTypeCode,
    });

    if (!lodash.isEmpty(supperPayable)) {
      const payableItem = claimPayableListMap[supperPayable.id];
      return {
        ...item,
        exchangeRatePolicyPayout: payableItem?.exchangeRatePolicyPayout,
        payoutToPolicyExchangeRate: divide(1, payableItem?.exchangeRatePolicyPayout),
      };
    }
    return {
      ...item,
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
    };
  };

  const mapBenefit = {
    [BenefitCategoryEnum.Reimbursement]: ({ item }: any) => {
      if (item?.isUpdate) return item;
      const supperPayable = lodash.find(claimPayableListMap, {
        incidentId: basic.incidentId,
        productCode: item?.coreProductCode,
        policyNo: item?.policyNo,
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
          ...item,
          ...apiExchangeRate,
          exchangeRatePolicyPayout: payableItem?.exchangeRatePolicyPayout,
          payoutToPolicyExchangeRate: divide(1, payableItem?.exchangeRatePolicyPayout),
        };
      }
      return {
        ...item,
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
      };
    },
    default: ({ item }: any) => {
      return getBasePayableItem({ item });
    },
  };

  const newBenefitListMap = lodash
    .chain(benefitListMap || {})
    .reduce((benefitObj: any, benefitIem: any) => {
      return {
        ...benefitObj,
        [benefitIem.id]: {
          ...benefitIem,
          listMap: lodash.reduce(
            benefitIem.listMap,
            (listObj: any, listItem: any) => {
              return {
                ...listObj,
                [listItem.id]: {
                  ...listItem,
                  childrenMap: lodash.reduce(
                    listItem.childrenMap,
                    (childObj: any, childItem: any) => {
                      childItem.policyCurrency= benefitIem.policyCurrency
                      const result = lodash.has(mapBenefit, benefitIem?.benefitCategory)
                        ? mapBenefit[benefitIem?.benefitCategory]({ item: childItem })
                        : mapBenefit.default({ item: childItem });
                      return {
                        ...childObj,
                        [childItem.id]: { ...(result || {}) },
                      };
                    },
                    {}
                  ),
                },
              };
            },
            {}
          ),
        },
      };
    }, {})
    .value();

  yield put({
    type: 'popUpPableUpdateBenefitListMap',
    payload: {
      benefitListMap: newBenefitListMap,
    },
  });
}
