import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import { SS, SSKey } from '@/utils/cache';
interface IParams {
  value: string | number;
  configItem: any;
  currency?: any;
  extraConfig?: any;
  multipleDropdown?: [string];
}
const getCodeAndNameList = ['servicingBranch'];
export default ({ value, configItem, currency, extraConfig, multipleDropdown }: IParams) => {
  const { field, fieldType, dropdownTypeCode, format } = lodash.pick(configItem, [
    'field',
    'fieldType',
    'dropdownTypeCode',
    'format',
  ]);
  const extraConfigItem = lodash.get(extraConfig, field);
  if (fieldType === 'Text') {
    return value;
  }
  if (fieldType === 'Date') {
    if (value) {
      return moment(value).format(format || 'L');
    }
    return null;
  }
  if (fieldType === 'Dropdown') {
    const formatDropdown = (v: any) => {
      if (lodash.has(extraConfig, field)) {
        if (lodash.isArray(extraConfigItem)) {
          return (
            lodash
              .chain(extraConfigItem)
              .find((dict: any) => dict?.dictCode === v)
              .thru((item) => {
                if (field?.includes(getCodeAndNameList)) {
                  if (item?.dictName && item?.dictCode) {
                    return `${item?.dictCode} - ${item?.dictName}`;
                  } else {
                    return item?.dictName || item?.dictCode;
                  }
                } else {
                  return item?.dictName;
                }
              })
              .value() || v
          );
        }
      }
      return formatMessageApi({
        [dropdownTypeCode]: v,
      });
    };
    if (lodash.includes(multipleDropdown, field)) {
      return lodash
        .chain(value)
        .toString()
        .split(',')
        .map((valueItem: string) => {
          return formatDropdown(valueItem);
        })
        .join(',')
        .value();
    }
    return formatDropdown(value);
  }
  if (fieldType === 'Number') {
    const scale = (() => {
      if (currency) {
        const accuracyConfig = SS.getItem(SSKey.ACCURACY_CONFIG);
        const { accuracyScale = 2 } = lodash
          .chain(accuracyConfig?.list)
          .find((item: any) => item?.objectFieldName === currency?.objectFieldName)
          .pick(['thousandSeparator', 'accuracyScale'])
          .value();
        return accuracyScale;
      }
      return 2;
    })();

    // @ts-ignore
    return fnPrecisionFormat(fnPrecisionParser(parseFloat(value).toFixed(scale)));
  }
  return value;
};
