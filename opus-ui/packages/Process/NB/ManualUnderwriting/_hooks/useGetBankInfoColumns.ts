import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const columns = [
    {
      fieldName: 'bankCode',
      id: 'bankCode',
      title: formatMessageApi({
        Label_BIZ_Policy: 'BankName',
      }),
      key: 'bankCode',
      span: 8,
    },
    {
      fieldName: 'bankBranch',
      id: 'bankBranch',
      title: formatMessageApi({
        Label_BIZ_Policy: 'BankBranch',
      }),
      key: 'bankBranch',
      span: 8,
    },
    {
      fieldName: 'accountNumber',
      id: 'accountNumber',
      title: formatMessageApi({
        Label_BIZ_Policy: 'AccountNumber',
      }),
      key: 'accountNumber',
      span: 8,
    },
  ];
  return columns;
};
