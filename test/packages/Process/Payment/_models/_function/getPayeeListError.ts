import lodash from 'lodash';
import { VLD_001139 } from 'claim/pages/PaymentAllocation/_validators/fieldValidators';

const getPayeeListError = (claimData: any) => {
  const payeeList = lodash.get(claimData, 'payeeList');
  const payeeListError: any = [];

  const VLD001139Error = VLD_001139(payeeList);
  if (VLD001139Error) {
    payeeListError.push(VLD001139Error);
  }

  return payeeListError;
};

export default getPayeeListError;
