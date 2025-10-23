import lodash from 'lodash';

const getPremBankAccount = (clientBankAccountList: any[], policyId: string) => {
  if (lodash.size(clientBankAccountList) < 1) return {};

  const premAccounts = lodash
    .chain(clientBankAccountList)
    .compact()
    .filter((bankAccount: any) => bankAccount.policyId === policyId)
    .value();

  return lodash.first(lodash.size(premAccounts) > 0 ? premAccounts : clientBankAccountList) || {};
};

export default getPremBankAccount;
