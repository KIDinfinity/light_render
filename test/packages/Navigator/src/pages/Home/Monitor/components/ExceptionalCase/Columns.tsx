import React from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button, Popover, notification } from 'antd';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import useGetScenarioMode from 'navigator/pages/Home/Monitor/Scenario/hooks/useGetScenarioMode';
import styles from './index.less';
import moment from 'moment';

const copy = (text: string) => {
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

export default ({ handleHeaderCell }: any) => {
  const mode = useGetScenarioMode();

  return lodash
    .chain([
      {
        labelTypeCode: 'Label_BIZ_Claim',
        id: 'SubmissionChannel',
        dataIndex: 'submissionChannel',
        sorter: true,
        sortable: true,
        render: (text: any) => text,
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND, ScenarioMode.COLLAPSE],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'CaseNo',
        dataIndex: 'caseNo',
        sorter: true,
        sortable: true,
        render: (text: any) => text,
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'BusinessNo',
        dataIndex: 'businessNo',
        sorter: true,
        sortable: true,
        render: (text: any) => text,
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND, ScenarioMode.COLLAPSE],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'CaseCategory',
        dataIndex: 'caseCategory',
        render: (text: any, item: any) =>
          formatMessageApi({ Label_BPM_CaseCategory: lodash.get(item, 'caseCategory') }) ||
          text ||
          '-',
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'Activity',
        dataIndex: 'activityKey',
        render: (text: any) => formatMessageApi({ activity: text }),
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'PolicyNo',
        dataIndex: 'policyNo',
        sorter: true,
        sortable: true,
        render: (text: any) => text,
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND, ScenarioMode.COLLAPSE],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'ResponseTime',
        dataIndex: 'responseTime',
        sorter: true,
        sortable: true,
        render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'ExceptionType',
        dataIndex: 'exceptionType',
        sorter: true,
        sortable: true,
        render: (text: any) => formatMessageApi({ Dropdown_COM_ExceptionType: text }),
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'ErrorMessage',
        dataIndex: 'errorMsg',
        sorter: true,
        sortable: true,
        render: (text: any) => {
          let newText = text;
          if (/{/.test(text) || /.java:/.test(text) || newText?.length > 10) {
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
          return newText;
        },
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND],
      },
      {
        labelTypeCode: 'Label_COM_MonitorCenter',
        id: 'ExceptonMessage',
        dataIndex: 'exceptionMsg',
        sorter: true,
        sortable: true,
        render: (text: any) => {
          let newText = text;
          if (/{/.test(text) || /.java:/.test(text) || newText?.length > 10) {
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
          return newText;
        },
        modes: [ScenarioMode.HOME_PAGE, ScenarioMode.EXPAND],
      },
    ])
    .map((el: any, index: number) => {
      return {
        title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
        dataIndex: el?.dataIndex,
        key: el?.key || el?.dataIndex,
        render: el?.render,
        className: el?.className,
        sorter: el?.sorter,
        modes: el?.modes,
        onHeaderCell: (column: any) =>
          el?.sorter
            ? {
                onClick: (e: any) => handleHeaderCell(column, e), // 点击表头行
              }
            : {},
      };
    })
    .filter((item: any) => lodash.includes(item?.modes, mode))
    .value();
};
