import React from 'react';
import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Popover } from 'antd';
import { copy } from '../../utils';
import styles from './index.less';
import { safeParseUtil } from '@/utils/utils';

const params = [
  {
    fieldName: 'fileName', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'FileName',
    dataIndex: 'fileName',
    sorter: true,
    sortable: true,
    ellipsis: true,
    width: 160,
    render: (text: any) => text,
  },
  {
    fieldName: 'executeDate', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'ExecuteDate',
    dataIndex: 'executeStartTime',
    sorter: true,
    sortable: true,
    ellipsis: true,
    width: 160,
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : '-'),
  },

  {
    fieldName: 'status',
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'ExecuteStatus',
    dataIndex: 'status',
    sorter: true,
    sortable: true,
    ellipsis: true,
    width: 120,
    render: (text: any) => formatMessageApi({ Dropdown_CFG_ExecuteStatus: text }),
  },
  {
    fieldName: 'execResult', // configuration match
    labelTypeCode: 'Label_BIZ_Claim',
    id: 'Result',
    dataIndex: 'execResult',
    width: 200,
    render: (text: any, records, index) => {
      if (text?.length < 10) return text;
      const content = (
        <div className={styles.content} id={`result_tooltip_${index}`}>
          {lodash.map(safeParseUtil(text), (el: any, index: number) => {
            return (
              <div key={index} className={styles.contentItem}>
                {el?.failMessage && <div> 【 Error 】 :{el?.failMessage}</div>}
                <div> 【 SQL 】 :{el?.sql}</div>
                <div> 【 Effected Rows 】 :{el?.effectedRows}</div>
                <div> 【 Time 】 :{el?.times} ms</div>
                <br />
              </div>
            );
          })}
        </div>
      );

      const title = (
        <Button
          style={{ textAlign: 'center' }}
          type="primary"
          onClick={() => {
            copy(document.querySelector(`#result_tooltip_${index}`)?.innerText || '');
          }}
        >
          copy
        </Button>
      );

      return (
        <Popover className={styles.ellipsis} content={content} title={title} placement="bottom">
          {text || '-'}
        </Popover>
      );
    },
  },
];

export default ({ handleHeaderCell }) => {
  return lodash.map(params, (el: any, index: number) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      width: el?.width,
      className: el?.className,
      sorter: el?.sorter,
      ellipsis: el?.ellipsis,
      onHeaderCell: (column: any, e) =>
        el?.sorter
          ? {
              onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
            }
          : {},
    };
  });
};
