import moment from 'moment';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const params = [
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'IntegrationCode',
    dataIndex: 'integrationCode',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_Exception',
    id: 'IntegrationSessionID',
    dataIndex: 'integrationSessionId',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseNo',
    dataIndex: 'bizCaseNo',
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
    id: 'BusinessNo',
    dataIndex: 'businessNo',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'Category',
    dataIndex: 'category',
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'RequestTime',
    dataIndex: 'requestTime',
    render: (text: any) => (text ? moment(text).format('YYYY/MM/DD HH:mm:ss') : ''),
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
