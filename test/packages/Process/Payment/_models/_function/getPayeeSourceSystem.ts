import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal } from '../_dto/Models';

const getPayeeSourceSystem = (policyBenefitList: any, payeeItem: PayeeModal | undefined) => {
  if (!policyBenefitList) {
    return null;
  }

  const payeeSourceSystemItem = lodash
    .chain(formUtils.cleanValidateData(policyBenefitList))
    .reduce((sum: any, n: any) => {
      return [...sum, ...(n?.beneficiaryList || [])];
    }, [])
    .find({ payeeId: payeeItem?.id })
    .value();

  return payeeSourceSystemItem?.sourceSystem || null;
};

export default getPayeeSourceSystem;
