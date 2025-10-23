import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Popover } from 'antd';
import { copy } from '../../utils';
import styles from './index.less';
const params = [
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseNo',
    dataIndex: 'caseNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'SubmissionDate',
    dataIndex: 'submissionDate',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'PolicyNo',
    dataIndex: 'policyNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'DocTypeName',
    dataIndex: 'docTypeName',
    render: (text: any) => {
      if (text?.length < 10) return text;
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
      return (
        <Popover className={styles.ellipsis} content={content} title={title}>
          {text}
        </Popover>
      );
    },
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CurrentActivity',
    dataIndex: 'currentActivity',
    render: (text: any) => formatMessageApi({ activity: text }),
  },
];

export default () => {
  return lodash.map(params, (el: any) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      className: el?.className,
      // onHeaderCell: (column: any) => ({
      //   onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
      // }),
    };
  });
};
