import lodash from 'lodash';
import moment from 'moment';
import { tenant } from '@/components/Tenant';
import { multiply } from '@/utils/precisionUtils';
import { ExchangeType, DefaultExchangeRate } from 'claim/pages/Enum';

const findMiddleRate = ({ exchangeRateList, fromCurrency, toCurrency }: any) => {
  const systemCurrency = tenant.currency();

  const key1 = {
    fromCurrency,
    toCurrency: systemCurrency,
    exchangeType: ExchangeType.External,
  };
  const rateList = [];

  const findExchangeRate1 = lodash.find(exchangeRateList, key1);

  const middleExchangeRate = findExchangeRate1?.exchangeRate;
  rateList.push(findExchangeRate1);
  const key2 = {
    fromCurrency: systemCurrency,
    toCurrency,
    exchangeType: ExchangeType.External,
  };
  const findExchangeRate2 = lodash.find(exchangeRateList, key2);
  const middleExchangeRate2 = findExchangeRate2?.exchangeRate;
  rateList.push(findExchangeRate2);

  const finalExchangeRate = multiply(middleExchangeRate, middleExchangeRate2);
  return {
    finalExchangeRate: finalExchangeRate ? lodash.toNumber(finalExchangeRate) : 0,
    rateList,
  };
};

const filterExchangeRateListFn = (exchangeRateList: any, lookUpDate?: any) => {
  const sortExchangeRateList = lodash
    .chain(exchangeRateList)
    .orderBy('effectiveDate', 'desc')
    .filter((item) => {
      if (lookUpDate) {
        return (
          moment(lookUpDate).isAfter(moment(item.effectiveDate)) ||
          moment(lookUpDate).isSame(moment(item.effectiveDate))
        );
      }
      return true;
    })
    .map((item) => {
      const temp = item;
      temp.groupby = `${item.fromCurrency}${item.toCurrency}`;
      return temp;
    })
    .groupBy('groupby')
    .map((item) => item?.[0])
    .value();
  return sortExchangeRateList;
};
const filterAllExchangeRates = (exchangeRate: any, param: any, exact?: boolean) => {
  let result = null;
  if (exact) {
    const {exchangeTypeList,fromCurrencyList,toCurrencyList} = param
    result = exchangeRate?.filter(item =>
      item.exchangeType === exchangeTypeList&&
      item.fromCurrency === fromCurrencyList&&
      item.toCurrency === toCurrencyList
      )
  } else {
    const { exchangeType, currencyList } = param;
    result = exchangeRate?.filter(
      (item: any) =>
        item.exchangeType === exchangeType &&
        ((item.fromCurrency === currencyList[0] && item.toCurrency === currencyList[1]) ||
          (item.fromCurrency === currencyList[1] && item.toCurrency === currencyList[0]))
    );
  }

  return filterExchangeRateListFn(result);
};
const findExchangeRate = ({ exchangeRateList, fromCurrency, toCurrency }: any) => {
  const keys = {
    fromCurrency,
    toCurrency,
    exchangeType: ExchangeType.External,
  };
  const result = lodash.find(exchangeRateList, keys);
  return {
    finalExchangeRate: result?.exchangeRate ? lodash.toNumber(result.exchangeRate) : 0,
    rateList: [result],
  };
};

const getExchangeRateByKeys = ({
  exchangeRateList,
  fromCurrency,
  toCurrency,
  exchangeDate,
}: any) => {
  const filterExchangeRateList = filterExchangeRateListFn(exchangeRateList, exchangeDate);
  let result = findExchangeRate({
    exchangeRateList: filterExchangeRateList,
    toCurrency,
    fromCurrency,
  });
  if (!result?.finalExchangeRate) {
    result = findMiddleRate({ exchangeRateList: filterExchangeRateList, fromCurrency, toCurrency });
  }
  return {
    exchangeRate: result.finalExchangeRate,
    rateList: result.rateList,
  };
};

const getExchangeRateValue = ({
  exchangeRateList,
  fromCurrency,
  toCurrency,
  exchangeDate,
  ...extra
}: any): number => {
  if (lodash.isEqual(toCurrency, fromCurrency) || lodash.size(exchangeRateList) === 0) {
    return DefaultExchangeRate.defaultRate;
  }
  return getExchangeRateByKeys({ exchangeRateList, toCurrency, fromCurrency, ...extra })
    ?.exchangeRate;
};

const mapDefaultRateRecord = ({ fromCurrency, toCurrency, exchangeRate }: any) => {
  const recordObj = {
    effectiveDate: new Date(),
    exchangeRate,
    exchangeType: ExchangeType.External,
    fromCurrency,
    toCurrency,
  };
  return JSON.stringify([recordObj]);
};

const mapRateList = (exchangeRateList: any[], exchangeRateDefault: any = {}) => {
  const exchangeRateDefaultTemp: any = { ...exchangeRateDefault };
  exchangeRateDefaultTemp.exchangeRate = DefaultExchangeRate.defaultRate;

  if (lodash.size(exchangeRateList) === 0 && !lodash.isEmpty(exchangeRateDefault))
    return mapDefaultRateRecord(exchangeRateDefaultTemp);

  const exchangeList = lodash.map(exchangeRateList, (item) => {
    return {
      effectiveDate: item?.effectiveDate,
      exchangeRate: item?.exchangeRate ? lodash.toNumber(item.exchangeRate) : 0,
      exchangeType: ExchangeType.External,
      fromCurrency: item?.fromCurrency,
      toCurrency: item?.toCurrency,
    };
  });
  return JSON.stringify(exchangeList);
};

const convertRateRecord = (exchangeReecordDate: any) => {
  return lodash.map(exchangeReecordDate, (item) => {
    const exchangeRateVal = item?.exchangeRate
      ? lodash.toNumber(item?.exchangeRate).toFixed(6)
      : '';

    return `${item?.fromCurrency}/${item?.toCurrency} = ${exchangeRateVal} (${moment(
      item?.effectiveDate
    ).format('L')})`;
  });
};

const generateCurrencis = (listPolicy: any[], defaultCurrency?: any[]) => {
  const systemCurrency = tenant.currency();
  const systemDefault = {
    currencyCode: systemCurrency,
    currencyName: systemCurrency,
  };
  if (lodash.isEmpty(listPolicy) && !lodash.isEmpty(defaultCurrency))
    return lodash
      .chain(defaultCurrency)
      .compact()
      .concat(systemDefault)
      .uniqBy('currencyCode')
      .value();

  return lodash
    .chain(listPolicy)
    .concat(defaultCurrency)
    .map((policy: any) => ({
      currencyCode: policy?.policyCurrency,
      currencyName: policy?.policyCurrency,
    }))
    .concat(systemDefault)
    .filter((currency: any) => !!currency?.currencyCode)
    .uniqBy('currencyCode')
    .value();
};

export {
  getExchangeRateByKeys,
  filterExchangeRateListFn,
  getExchangeRateValue,
  mapRateList,
  mapDefaultRateRecord,
  convertRateRecord,
  generateCurrencis,
  filterAllExchangeRates,
};
