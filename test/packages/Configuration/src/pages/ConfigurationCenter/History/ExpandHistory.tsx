import React, { useMemo } from 'react';
import { Table, Spin } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {v5 as uuidv5 } from 'uuid';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from '../DataVersion/index.less';
import { getVersionColumns } from '../Utils/DataVersion';
import type { FunctionDataProps } from '../Utils/Typings';

interface HistoryProps {
  record?: Record<string, any>;
  history?: Record<string, any>[];
  pagination?: Record<string, any>;
}
interface DataVersionProps {
  record: Record<string, any>;
}


function ExpandHistory({record = {}}: DataVersionProps) {
  const dataHistory: HistoryProps[] = useSelector((state: any) => state.configurationDataImage.dataHistory);
  const currentRecord: Record<string, any> = useSelector((state: any) => state.configurationDataImage.currentRecord);
  const functionData: FunctionDataProps = useSelector((state: any) => state.configurationCenter.functionData);
  const historyLoading: boolean = useSelector((state: any) => state.loading.effects['configurationDataImage/listAllHistoryByPage']);

  const recordLoading = lodash.isEqual(currentRecord, record) && historyLoading;
  const { dataFieldList = [] } = functionData;
  const columns = useMemo(() => {
    const newColumns = getVersionColumns({
      dataFieldList,
      isVersionTable: true,
      isNeedEdit: false,
    });
    return lodash.map(newColumns, (item: any) => {
      if (item.sorter) {
        lodash.set(item, 'sorter', (a: any, b: any) => {
          const aText = String(a[item.dataIndex]) || '';
          const bText = String(b[item.dataIndex]) || '';
          return aText.localeCompare(bText);
        });
      }
      return item;
    });
  }, [dataFieldList]);

  const target: HistoryProps | undefined = dataHistory.find((el: HistoryProps) =>
    lodash.isEqual(el.record, record)
  );
  const history = (target && target.history) || [];

  const tableProps = {
    rowKey: (r: any) => uuidv5(JSON.stringify(r), uuidv5.URL),
    defaultExpandAllRows: true,
    className: styles.dataVersion,
    columns,
    dataSource: history,
    pagination: false,
    loading: recordLoading,
  };

  return (
    <>
      {recordLoading && <Spin />}
      {/**
        //@ts-ignore */}
      {!recordLoading && history.length > 0 && <Table {...tableProps} />}
      {!recordLoading && history.length < 1 && (
        <div className={styles.emptyData}>
          {formatMessageApi({
            Label_COM_WarningMessage: 'configurationcenter.message.NoHistoryData',
          })}
        </div>
      )}
    </>
  );

}
export default ExpandHistory;
