import lodash from 'lodash';

const splitBankAccount = (bankAccount: any) => {
  return lodash.chain(bankAccount).split('-').first().trim().value();
};

const getBankAccountItem = ({ clientId, bankAccountList, id }: any) => {
  const mapBankAccoutList = clientId ? bankAccountList?.[clientId] : [];
  return lodash.find(mapBankAccoutList, { id });
};

const getBankAccountNoList = ({ mapBankAccoutList }: any) => {
  return lodash
    .chain(mapBankAccoutList)
    .map((item) => item.bankAccountNo)
    .compact()
    .value();
};

export default { splitBankAccount, getBankAccountItem, getBankAccountNoList };
