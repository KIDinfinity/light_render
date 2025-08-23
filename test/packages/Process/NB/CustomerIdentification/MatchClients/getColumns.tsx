import lodash from 'lodash';
import { tableRenderTransfer } from '../Utils';

export default (columnList: any, tableWidth: any) => {
  const totalSpan = lodash.reduce(
    columnList,
    (sum, n) => {
      return sum + n.span || 0;
    },
    0
  );
  return (
    lodash.map(columnList, (item: any) => ({
      title: item.name,
      dataIndex: item.field,
      key: item.field,
      render: (el: any, record: any) => {
        return tableRenderTransfer(item?.fieldType, record[item.field], item.dictTypeCode);
      },
      // width: (tableWidth - 24) * item.width,
      width: lodash.isNumber(item.span) && `${(item.span / totalSpan) * 100}%`,
    })) || []
  );
};
