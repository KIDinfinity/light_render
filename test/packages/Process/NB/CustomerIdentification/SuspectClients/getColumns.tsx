import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CustomerType from 'process/NB/Enum/CustomerType';
import { tableRenderTransfer, matchClientField } from 'process/NB/CustomerIdentification/Utils';
import styles from './index.less';
import filedsValueDiff from 'process/NB/CustomerIdentification/Utils/filedsValueDiff';

export default (columnList: any, newClient: any) => {
  const getLabelTitle = ({ field, name }: any) => {
    if (newClient?.customerType === CustomerType.Entity && field === 'customerEnSurname') {
      return 'Entity Name';
    }
    return name;
  };
  const totalSpan = lodash.reduce(
    columnList,
    (sum, n) => {
      return sum + n.span || 0;
    },
    0
  );
  const baseColumnList = lodash
    .chain(columnList)
    .map((item: any) => {
      return {
        title: getLabelTitle({ field: item?.field, name: item?.name }),
        dataIndex: item?.field,
        key: item?.field,
        render: (el: any, record: any, index: number) => {
          const field = lodash.has(matchClientField, item?.field)
            ? matchClientField[`${item?.field}`]
            : item?.field;
          if (
            index >= 1 &&
            !filedsValueDiff({ originalData: record, newData: newClient, fieldConfig: item })
          ) {
            return (
              <span className={styles.diffInfoName}>
                {tableRenderTransfer(item?.fieldType, record[field], item.dictTypeCode)}
              </span>
            );
          }
          return tableRenderTransfer(item?.fieldType, record[field], item.dictTypeCode);
        },
        // width: (tableWidth - 190 - 24) * item.width,
        width: lodash.isNumber(item.span) && `${(item.span / totalSpan) * 100}%`,
      };
    })
    .value();

  const firstColumn = {
    title: '',
    dataIndex: '',
    key: '',
    render: (el: any, record: any, index: number) => {
      if (index === 0) {
        return <span> {formatMessageApi({ Dropdown_IND_ClientTag: 'RequestData' })}</span>;
      }
      return (
        <div className={styles.basic}>
          <div className={styles.name}>
            {' '}
            {formatMessageApi({ Dropdown_IND_ClientTag: 'SuspectClient' })} {index}
          </div>
          <div className={styles.num}>{record?.laClientId}</div>
        </div>
      );
    },
    width: 110,
  };

  return baseColumnList && baseColumnList.length ? [firstColumn, ...baseColumnList] : [];
};
