import { produce } from 'immer';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { ClaimDecision } from 'claim/pages/utils/claim';
import {
  getExchangeRateValue,
  mapRateList,
  mapDefaultRateRecord,
} from 'claim/pages/utils/handleExchangeRate';
import { safeParseUtil } from '@/utils/utils';
import { DefaultExchangeRate } from 'claim/pages/Enum';
import { getPolicyNoList } from 'basic/utils/PolicyUtils';

const filterNewRateRecord = (exchangeRateRecord: any, newRateRecord: any) => {
  return lodash
    .chain(exchangeRateRecord)
    .concat(newRateRecord)
    .orderBy('effectiveDate', 'desc')
    .map((item) => {
      const temp = item;
      temp.groupby = `${item.fromCurrency}${item.toCurrency}${lodash
        .toNumber(item.exchangeRate)
        .toFixed(6)}`;
      return temp;
    })
    .groupBy('groupby')
    .map((item) => lodash.first(item))
    .compact()
    .value();
};

const saveClaimPayablePolicyCurrency = (state: any, action: any) => {
  const nextState = produce(state, (draftState) => {
    const { policyCurrency, payoutCurrency, payableId } = action.payload;
    const {
      exchangeRateList,
      claimProcessData,
      claimEntities,
      listPolicy,
    } = lodash.pick(draftState, [
      'exchangeRateList',
      'claimProcessData',
      'claimEntities',
      'listPolicy',
    ]);
    const { claimPayableList, claimDecision } = claimProcessData;
    const { exchangeRateRecord } = claimDecision;
    const systemCurrency = tenant.currency();
    let newRecord = null;
    if (payableId) {
      const exchangeRate = getExchangeRateValue({
        exchangeRateList,
        toCurrency: payoutCurrency,
        fromCurrency: policyCurrency,
      });
      draftState.claimEntities.claimPayableListMap[
        payableId
      ].exchangeRatePolicyPayout = exchangeRate;

      const policyNo = draftState.claimEntities.claimPayableListMap[payableId]?.policyNo;

      const policyCurrencyVal = getPolicyNoList({
        listPolicy,
        policyNo: formUtils.queryValue(policyNo),
      })?.policyCurrency;
      draftState.claimEntities.claimPayableListMap[payableId].policyCurrency = policyCurrencyVal;

      // 更新treatment Invoice Service payable policyCurrency
      const treatmentPayableList =
        draftState.claimEntities.claimPayableListMap[payableId]?.treatmentPayableList;
      lodash.map(treatmentPayableList, (treatmentPayableItemId) => {
        const treatmentPayableItem =
          draftState.claimEntities.treatmentPayableListMap[treatmentPayableItemId];
        draftState.claimEntities.treatmentPayableListMap[
          treatmentPayableItemId
        ].policyCurrency = policyCurrencyVal;
        const invoicePayableList = treatmentPayableItem?.invoicePayableList;

        lodash.map(invoicePayableList, (invoicePayableItemId) => {
          const invoicePayableItem =
            draftState.claimEntities.invoicePayableListMap[invoicePayableItemId];
          draftState.claimEntities.invoicePayableListMap[
            invoicePayableItemId
          ].policyCurrency = policyCurrencyVal;
          const serviceItemPayableList = invoicePayableItem?.serviceItemPayableList;

          lodash.map(serviceItemPayableList, (servicePayableItemId) => {
            draftState.claimEntities.serviceItemPayableListMap[
              servicePayableItemId
            ].policyCurrency = policyCurrencyVal;
          });
        });
      });
    } else {
      lodash.forEach(claimPayableList, (claimPayableItemId) => {
        const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
        const exchangeRate = getExchangeRateValue({
          exchangeRateList,
          toCurrency: payoutCurrency,
          fromCurrency: claimPayableItem.policyCurrency || systemCurrency,
        });
        if (formUtils.queryValue(claimPayableItem.claimDecision) !== ClaimDecision.deny) {
          claimPayableItem.exchangeRatePolicyPayout = exchangeRate;
        }
      });
    }

    if (policyCurrency) {
      const filterExchangeRateList = lodash.filter(
        exchangeRateList,
        (item) => item.fromCurrency === policyCurrency && item.toCurrency === payoutCurrency
      );

      const defaultRecord = mapRateList(filterExchangeRateList, {
        fromCurrency: policyCurrency,
        toCurrency: payoutCurrency,
      });
      newRecord = safeParseUtil(defaultRecord);
      // 判断当前exchangeRateRecord是否有值
      const exchangeRecordVal = formUtils.queryValue(exchangeRateRecord);
      // 若exchangeRateRecord不为空，则将newRecord与exchangeRateRecord 拼接起来。
      if (exchangeRecordVal) {
        newRecord = filterNewRateRecord(safeParseUtil(exchangeRecordVal), newRecord);
      }
    } else {
      const recordList: any = [];
      const defaultRecordVal: any = [];
      lodash.forEach(claimPayableList, (claimPayableItemId) => {
        const claimPayableItem = claimEntities.claimPayableListMap[claimPayableItemId];
        const filterRateList = lodash.find(exchangeRateList, {
          fromCurrency: claimPayableItem?.policyCurrency,
          toCurrency: payoutCurrency,
        });
        // if payoutCurrency === policyCurrency 赋值默认的rateRecord
        if (!filterRateList) {
          const defaultRateRecord = mapDefaultRateRecord({
            fromCurrency: claimPayableItem?.policyCurrency || systemCurrency,
            toCurrency: payoutCurrency,
            exchangeRate: lodash.isEqual(claimPayableItem?.policyCurrency, payoutCurrency)
              ? DefaultExchangeRate.defaultRate
              : '',
          });
          defaultRecordVal.push(...safeParseUtil(defaultRateRecord));
        } else {
          recordList.push(filterRateList);
        }
      });
      const newRecordList = lodash.chain(recordList).compact().uniq().value();
      newRecord = filterNewRateRecord(defaultRecordVal, safeParseUtil(mapRateList(newRecordList)));
    }
    draftState.claimProcessData.claimDecision.exchangeRateRecord = JSON.stringify(newRecord);
  });
  return { ...nextState };
};

export default saveClaimPayablePolicyCurrency;
