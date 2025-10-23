import lodash from 'lodash';
import transFieldsConfig from 'basic/utils/transFieldsConfig';
import transFieldValue from 'basic/utils/transFieldValue';

interface IParams {
  config: any[];
  currencyConfig?: any;
}

export default ({ config, currencyConfig }: IParams) => {
  const list = transFieldsConfig({ config });
  const totalSpan = lodash.reduce(
    list,
    (sum, n) => {
      return sum + n.span || 0;
    },
    0
  );
  return lodash
    .chain(list)
    .map((item) => {
      const rowMap = new Map();
      rowMap.set('key', item.field);
      rowMap.set('title', item.label);
      rowMap.set('dataIndex', item.field);
      rowMap.set('className', `NBclienInfo-${item.field}`);
      rowMap.set('render', (text: any) => {
        return transFieldValue({
          value: text,
          configItem: item,
          currency: lodash.get(currencyConfig, item?.field),
        });
      });
      if (lodash.isNumber(item.span)) {
        rowMap.set('width', `${(item.span / totalSpan) * 100}%`);
      }
      return Object.fromEntries(rowMap);
    })
    .value();
};
