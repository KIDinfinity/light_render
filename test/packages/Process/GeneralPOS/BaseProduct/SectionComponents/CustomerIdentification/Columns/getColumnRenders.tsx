import classNames from 'classnames';
import lodash from 'lodash';
import { IdentificationClientTagEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import type { IdentificationClientTagType } from '../enum';
import type { IClient } from '../types';
import styles from './index.less';
import { transferConfigToColumns } from './transferConfigToColumns';

const excludeDiffFields = ['clientId', 'fullName'];

const isFieldDiff = (
  field: string,
  data: IClient,
  referData?: IClient | null,
  exclude?: string[]
) => {
  if (lodash.isEmpty(referData) || lodash.isNil(referData) || lodash.includes(exclude, field)) {
    return false;
  }
  return !lodash.isEqual(data[field], referData[field]);
};

const renderOperation = (clientId: string, index: number) => {
  return (
    <div className={classNames(styles.tableValue, styles.operationWrapper)}>
      <div>{index === 0 ? 'Create New' : `Supect Client ${index}`}</div>
      {clientId && <div>{clientId}</div>}
    </div>
  );
};

const getColumnRenders = (
  configs: any[],
  dictionaryController: any,
  identifyResultTag?: IdentificationClientTagType,
  referData?: IClient | null
) => {
  let columns = transferConfigToColumns(configs);
  const isSuspectClient = identifyResultTag === IdentificationClientTagEnum.SuspectClient;
  if (isSuspectClient) {
    const operationColumn = {
      field: 'clientId',
      key: 'clientId',
      span: 6,
      fieldType: '',
      dictTypeCode: '',
      name: '',
      width: '',
      visible: 'Y',
    };
    columns = [operationColumn, ...columns];
  }

  columns = lodash.filter(columns, ({ visible }: any) => visible === 'Y');

  const totalSpan = lodash.reduce(
    columns,
    (sum, n) => {
      return sum + n.span || 0;
    },
    0
  );

  const renders = lodash.map(columns, (column: any) => {
    const { name, field, dictTypeCode } = column;

    return {
      title: name,
      dataIndex: field,
      key: field,
      render: (text: any, record: any, index: number) => {
        if (field === 'clientId') {
          return renderOperation(text, index);
        }
        const isDiff = isSuspectClient && isFieldDiff(field, record, referData, excludeDiffFields);
        let dictName = text;
        if (dictTypeCode) {
          const dicts = dictionaryController?.[dictTypeCode];
          dictName = lodash.find(dicts || [], { dictCode: text })?.dictName;
        }
        return (
          <div className={classNames({ [styles.tableValue]: true, [styles.highLight]: isDiff })}>
            {dictName}
          </div>
        );
      },
      width: lodash.isNumber(column.span) ? `${(column.span / totalSpan) * 100}%` : '',
    };
  });
  return renders;
};

export default getColumnRenders;
