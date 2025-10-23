import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { TableProps } from '@ctc/antd/lib/table';
import { formatAmount } from 'claim/pages/360/_functions';

const summaryColumns = (): TableProps<any>['columns'] => [
  {
    title: formatMessageApi({ Label_BIZ_Policy: 'Summary' }),
    dataIndex: 'benefitType',
    key: 'benefitType',
    onCell: (row: any) => ({
      rowSpan: row?.rowSpan || 0,
      style: row?.rowSpan ? {} : { display: 'none' },
    }),
    render: (code: string, record: any) =>
      record?.rowSpan && formatMessageApi({ Label_Slider_360: code }),
  },
  {
    dataIndex: 'benefitSubType',
    key: 'benefitSubType',
  },
  {
    title: formatMessageApi({
      Label_BIZ_Policy: 'laPending',
    }),
    dataIndex: 'laPending',
    key: 'laPending',
    render: (text: string) => formatAmount(Number(text)),
  },
  {
    title: formatMessageApi({
      Label_BIZ_Policy: 'laExisting',
    }),
    dataIndex: 'laExisting',
    key: 'laExisting',
    render: (text: string) => formatAmount(Number(text)),
  },
  {
    title: formatMessageApi({
      Label_BIZ_Policy: 'ilPending',
    }),
    dataIndex: 'ilPending',
    key: 'ilPending',
    render: (text: string) => formatAmount(Number(text)),
  },
  {
    title: formatMessageApi({
      Label_BIZ_Policy: 'ilExisting',
    }),
    dataIndex: 'ilExisting',
    key: 'ilExisting',
    render: (text: string) => formatAmount(Number(text)),
  },
  {
    title: formatMessageApi({
      Label_BIZ_Policy: 'TotalSA',
    }),
    dataIndex: 'total',
    key: 'total',
    render: (text: string) => formatAmount(Number(text)),
  },
];

export { summaryColumns };
