import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatAmount } from 'claim/pages/360/_functions';

export default () => [
  {
    title: formatMessageApi({
      Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.benefit-type',
    }),
    dataIndex: 'benefitType',
    key: 'benefitType',
    render: (code: string) => formatMessageApi({ Label_Slider_360: code }),
  },
  {
    title: 'Plan Code',
    dataIndex: 'componentCode',
    key: 'componentCode',
  },
  {
    title: formatMessageApi({ Dropdown_IND_NewClientFlag: 'Y' }),
    dataIndex: 'newTotalTsar',
    key: 'newTotalTsar',
    render: (text: string) => formatAmount(text),
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'app.navigator.drawer.pending.label.pending' }),
    dataIndex: 'pendingTotalTsar',
    key: 'pendingTotalTsar',
    render: (text: string) => formatAmount(text),
  },
  {
    title: formatMessageApi({ nb_policyStatus_mapping: 'IF' }),
    dataIndex: 'existingTotalTsar',
    key: 'existingTotalTsar',
    render: (text: string) => formatAmount(text),
  },
  {
    title: formatMessageApi({ Label_BIZ_Claim: 'component.tableSearch.total' }),
    dataIndex: 'total',
    key: 'total',
    render: (text: string) => formatAmount(text),
  },
];
