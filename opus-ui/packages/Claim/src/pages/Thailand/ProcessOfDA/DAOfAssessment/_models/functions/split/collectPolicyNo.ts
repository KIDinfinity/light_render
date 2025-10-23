import { isArray, chain } from 'lodash';

/**
 * 抽离出claim payable中的policy number
 */
export default (claimPayableList: any) => {
  if (!isArray(claimPayableList)) return [];

  return chain(claimPayableList)
    .map((payable: any) => payable.policyNo)
    .compact()
    .value();
};
