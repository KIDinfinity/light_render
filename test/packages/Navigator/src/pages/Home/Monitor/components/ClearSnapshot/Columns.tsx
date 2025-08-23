import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const params = [
  {
    fieldName: 'caseNo', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseNo',
    dataIndex: 'caseNo',
    render: (text: any) => text,
  },
  {
    fieldName: 'transactionResult', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'TransactionResult',
    dataIndex: 'transactionResult',
    render: (text: any) => text,
  },
  {
    fieldName: 'transactionTime', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'TransactionTime',
    dataIndex: 'transactionTime',
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : '-'),
  },
  {
    fieldName: 'taskId', // configuration match
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'TaskId',
    dataIndex: 'taskId',
    render: (text: any) => text,
  },
  {
    fieldName: 'activityKey',
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'Activity',
    dataIndex: 'activityKey',
    render: (text: any) => formatMessageApi({ activity: text }),
  },
];

export default () => {
  return lodash.map(params, (el: any, index: number) => {
    return {
      title: formatMessageApi({ [el?.labelTypeCode]: el?.id }),
      dataIndex: el?.dataIndex,
      key: el?.key || el?.dataIndex,
      render: el?.render,
      className: el?.className,
    };
  });
};
