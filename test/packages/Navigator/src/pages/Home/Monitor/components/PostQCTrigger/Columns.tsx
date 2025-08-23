import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Popover } from 'antd';
import { copy } from '../../utils';
import React from 'react';
import styles from './index.less';

export const postQCStatusList = [
  {
    dictName: 'Success',
    dictCode: 'Success',
  },
  {
    dictName: 'Fail',
    dictCode: 'Fail',
  },
];

const params = [
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseCategory',
    dataIndex: 'caseCategory',
    render: (text: any) => formatMessageApi({ Dropdown_PRC_workFlow: text }),
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'ApplicationNo',
    dataIndex: 'inquiryBusinessNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'PostQCStatus',
    dataIndex: 'status',
    render: (text: any) => text || 'Fail',
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'Re-GenResult',
    dataIndex: 'retryStatus',
    render: (text: any) => text || '-',
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'FailReason',
    dataIndex: 'errorMsg',
    render: (text: any) => {
      if (text?.length < 10)
        return text;
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
];

export default () => {
  return lodash.map(params, (el: any) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      className: el?.className,
    };
  });
};
