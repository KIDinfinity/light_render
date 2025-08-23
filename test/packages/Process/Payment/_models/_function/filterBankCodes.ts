import lodash from 'lodash';

/**
 * 根据codeName获取code的value
 * @param bankAccounts
 * @param codeName
 * @returns
 */
const filterBankCodes = (bankAccounts: any[], codeName: string) =>
  lodash
    .chain(bankAccounts)
    .map((item: any) => item[codeName])
    .compact()
    .uniq()
    .value();

export default filterBankCodes;
