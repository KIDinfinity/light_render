import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import moment from 'moment';
import DateFormat from 'navigator/pages/ReportCenter/Enum/DateFormat';
import { formatValue } from 'navigator/pages/Home/Dashboard/Utils';
import { getDataFormat } from 'navigator/pages/Home/Dashboard/_models/function';

export const renderTitle = (item, format) => {
  let title = '';
  if (format && DateFormat[format]) {
    if (item.label.includes(',')) {
      const arr = lodash.split(item.label, ',');
      const newArr = lodash.map(arr, (value) => {
        return moment(value).format(DateFormat[format] || 'L');
      });
      title = lodash.join(newArr, ',');
    } else {
      if (moment(item.label).isValid()) {
        title = moment(item.label).format(DateFormat[format] || 'L');
      } else {
        title = formatMessageApi({ [item.miscType]: item.label });
      }
    }
  } else {
    title = formatMessageApi({ [item.miscType]: item.label });
  }
  return title;
};
export const ArrayTransfer = (value) =>
  lodash
    .chain(value)
    .split(',')
    .map((item) => lodash.trim(item))
    .value();

export const valueFormat = (value, vFormat, total: number) => {
  const { dataFormat, format } = getDataFormat(vFormat);
  return formatValue({ value, dataFormat, format, total });
};

export const valueMap = (subValue, level, codeList, columnFieldList, dataFormat, list) => {
  if (subValue?.value && lodash.isArray(subValue?.value) && subValue?.value.length) {
    const currentLevel = level + 1;
    const format = columnFieldList.find(
      (item) => item.fieldName === codeList[currentLevel]
    )?.format;
    return lodash.map(subValue.value, (vItem) => {
      return {
        ...vItem,
        labelFormat: format,
        currentLevel,
        lalelValue: renderTitle(vItem, format),
        value: valueMap(vItem, currentLevel, codeList, columnFieldList, dataFormat, subValue.value),
      };
    });
  } else {
    return valueFormat(subValue.value, dataFormat, getTotalFromCurrentList(list));
  }
};

export const getFormat = (subValue, level, codeList, columnFieldList, dataFormat, list) => {
  const current = columnFieldList.find((item) => item.fieldName === codeList[level]);
  if (lodash.isArray(subValue.value) && subValue.value.length) {
    return {
      ...subValue,
      labelFormat: current?.format,
      lalelValue: renderTitle(subValue, current?.format),
      currentLevel: level,
      value: valueMap(subValue, level, codeList, columnFieldList, dataFormat),
    };
  } else {
    return {
      ...subValue,
      value: valueFormat(subValue.value, dataFormat, getTotalFromCurrentList(list)),
      labelFormat: current?.format,
      lalelValue: renderTitle(subValue, current?.format),
    };
  }
};

const getTotalFromCurrentList = (list) => {
  return lodash.sumBy(list, (item) => item.value);
};

export const transferStatisticInfo = (list, columnFieldList, statisticMetaList) => {
  return lodash.reduce(
    statisticMetaList,
    (newList, item) => {
      const currentStatistic = list[item.statisticCode];
      if (currentStatistic) {
        let codeList = [];
        if (lodash.includes(item.groupByField, ',')) {
          codeList = ArrayTransfer(item.groupByField);
        } else {
          codeList = [item.groupByField];
        }
        const newStatistic = lodash.map(currentStatistic, (subValue) => {
          return getFormat(
            subValue,
            0,
            codeList,
            columnFieldList,
            item.dataFormat,
            currentStatistic
          );
        });
        return {
          ...newList,
          [item.statisticCode]: newStatistic,
        };
      }

      return newList;
    },
    {}
  );
};
