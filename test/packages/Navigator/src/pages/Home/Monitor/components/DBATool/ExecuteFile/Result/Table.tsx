import React, { useState, useMemo } from 'react';
import { Table, Button, notification, Popover } from 'antd';

// @ts-ignore
import Highlighter from 'react-highlight-words';
import styles from './index.less';
import { Print } from 'navigator/pages/ReportCenter/_utils/utils';
import moment from 'moment';

const ResultTable = ({ item = {}, index, isExpand }: any) => {
  const { resultSet, limit = '' } = item;
  const [exportLoading, setExportLoading] = useState(false);

  const copy = (text) => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', text);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input);
    notification.success({ message: 'Copy Success' });
  };

  const exportCur = async () => {
    setExportLoading(true);

    const headerInfo = Object.keys(resultSet[0])?.map((key: string) => ({
      columnTitle: key,
      entityField: key,
      render: 'string',
    }));

    const printUtils = new Print();
    const name = `${moment().format('YYYY-MM-DD HH-m')}-Result ${index + 1}`;
    printUtils.printExcelFn({
      worksheetName: name,
      headerInfo,
      bodyInfo: resultSet,
      fileName: name,
    });
    setExportLoading(false);
  };

  const columns = useMemo(
    () =>
      Object.keys(resultSet?.[0])?.map((key: string) => ({
        title: key,
        name: key,
        sorter: (a: any, b: any) => `${a?.[key] || ''}`?.localeCompare(`${b?.[key] || ''}`),
        dataIndex: key,
        width: 160,
        render: (text: any = '-') => {
          let newText = text;
          if (/{/.test(text) || /.java:/.test(text) || newText?.length > 36) {
            const title = (
              <Button
                style={{ textAlign: 'center' }}
                type="primary"
                onClick={() => {
                  copy(text);
                }}
              >
                copy
              </Button>
            );

            const content = <div className={styles.content}>{text}</div>;
            newText = (
              <Popover className={styles.ellipsis} content={content} title={title}>
                {text}
              </Popover>
            );
          }

          return newText || '-';
        },
      })),
    [resultSet]
  );

  return (
    <div className={styles.tableResult}>
      <div className={styles.export}>
        <Button block className={styles.exportBtn} onClick={exportCur} loading={exportLoading}>
          Export
        </Button>
      </div>
      <Table
        scroll={{
          x: 'max-content',
          scrollToFirstRowOnChange: true,
        }}
        pagination={{
          showTotal: () => `Limit ${limit}`,
          pageSize: isExpand ? 10 : 5,
          size: 'small',
        }}
        rowKey="id"
        columns={columns}
        dataSource={resultSet}
      />
    </div>
  );
};

export default ResultTable;
