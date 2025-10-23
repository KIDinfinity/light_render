import type { ReactNode } from 'react';
import lodash from 'lodash';
import { getStatus } from '../Utils/DataVersion';
import type { DataFieldProps } from '../Utils/Typings';
import { getColumns } from '../Utils/FormUtils';

export const HistoryColumn = [
  'batch_no',
  'status',
  'operator',
  'operate_time',
  'status_change_desc',
  'assignee',
];

export const getHistoryDataField = (dataFieldList: DataFieldProps[] = []): DataFieldProps[] => {
  return lodash.filter(dataFieldList, (item: DataFieldProps) =>
    lodash.includes(HistoryColumn, item.fieldName)
  );
};

export const getHistoryColumns = (
  dataFieldList: DataFieldProps[] = [],
  columnsFilter: any = {}
) => {
  return getColumns({
    dataFieldList: getHistoryDataField(dataFieldList),
    columnsFilter,
    camelCase: false,
  });
};

// 列表排序  operation_time 下划线
// 搜索 小驼峰
// default_sort 下划线
export default (dataField: DataFieldProps[] = [], columnsFilter: any = {}) => {
  const defaultColumns = getHistoryColumns(dataField, columnsFilter);
  lodash.map(defaultColumns, (item: any) => {
    if (item.key === 'status') {
      lodash.set(item, 'render', (text: string): ReactNode => getStatus(text));
    } else {
      lodash.set(item, 'render', (text: string, record: any) =>
        lodash.get(record, lodash.camelCase(item.key))
      );
    }
  });
  return defaultColumns;
};
