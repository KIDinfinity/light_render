import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const params = [
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseNo',
    dataIndex: 'caseNo',
    sorter: true,
    sortable: true,
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'PolicyNo',
    dataIndex: 'policyNo',
    sorter: true,
    sortable: true,
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'BusinessNo',
    dataIndex: 'businessNo',
    sorter: true,
    sortable: true,
    render: (text: any) => text,
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CaseCategory',
    dataIndex: 'caseCategory',
    render: (text: any) => formatMessageApi({ Label_BPM_CaseCategory: text }) || text || '-',
  },

  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'CurrentActivity',
    dataIndex: 'currentActivity',
    render: (text: any) => formatMessageApi({ activity: text }) || text || '-',
  },
  {
    labelTypeCode: 'Label_COM_MonitorCenter',
    id: 'Status',
    dataIndex: 'status',
    render: (text: any) => text,
  },
];
export default ({ handleHeaderCell }: any) => {
  return lodash.map(params, (el: any, index: number) => {
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
  });
};
