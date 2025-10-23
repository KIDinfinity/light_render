import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import transFieldValue from 'basic/utils/transFieldValue';

export default ({ columnList, item, index }: any) => {
  const column = (() => {
    const totalSpan = lodash.reduce(
      columnList,
      (sum, n) => {
        return sum + n.span || 0;
      },
      0
    );

    const firstColumn = {
      title: '',
      dataIndex: '',
      key: 'laClientId',
      value:
        formatMessageApi({ Dropdown_IND_ClientTag: 'ExistingAuthorisedSignatory' }) +
        ' ' +
        (index + 1) +
        ' ' +
        (item?.laClientId || ''),
      width: 275,
    };

    const baseColumnList =
      lodash.map(columnList, (item: any) => ({
        title: item.name,
        dataIndex: item.field,
        key: item.field,
        dropdownTypeCode: item.dictTypeCode,
        fieldType: item?.fieldType,
        width: lodash.isNumber(item.span) && `${(item.span / totalSpan) * 100}%`,
      })) || [];

    return baseColumnList && baseColumnList.length ? [firstColumn, ...baseColumnList] : [];
  })();

  const data = (() => {
    return lodash
      .chain(column)
      .map((columnItem: any) => {
        const value = (() => {
          const text = lodash.get(item, columnItem?.key);
          return transFieldValue({
            value: text,
            configItem: columnItem,
          });
        })();
        return {
          value,
          ...columnItem,
        };
      })
      .value();
  })();

  return data;
};
