import { formatMessageApi } from '@/utils/dictFormatMessage';

enum TabIndex {
  case = '1',
  task = '2',
  user = '3',
  cliamHistory = '4',
  document = '6',
  rule = '7',
  posHistory = '8',
  nbHistory = '9',
}

export default {
  [TabIndex.case]: formatMessageApi({
    Label_COM_General: 'caseinquiry',
  }),
  [TabIndex.task]: formatMessageApi({
    Label_COM_General: 'taskinquiry',
  }),
  [TabIndex.user]: formatMessageApi({
    Label_COM_General: 'userinquiry',
  }),
  [TabIndex.cliamHistory]: formatMessageApi({
    Label_COM_General: 'claimhistoryinquiry',
  }),
  [TabIndex.document]: formatMessageApi({
    Label_COM_General: 'documentinquiry',
  }),
  [TabIndex.rule]: formatMessageApi({
    Label_COM_General: 'ruleinquiry',
  }),
  [TabIndex.posHistory]: formatMessageApi({
    Label_COM_General: 'Poshistoryinquiry',
  }),
  [TabIndex.nbHistory]: formatMessageApi({
    Label_COM_Inquiry: 'NBHistoryInquiry',
  }),
};

export const sorts = {
  asc: 'ascend',
  desc: 'descend',
  '': false,
  undefined: false,
};
