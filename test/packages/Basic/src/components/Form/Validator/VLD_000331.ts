// import { formatMessageApi } from '@/utils/dictFormatMessage';
// import { PolicyBenefitModal, BeneficiaryModal } from '../_dto/Models';
// import { duplicateBeneficiary } from './validatorUtils';
/**
 *
 * @param policyBenefits  校验policy benefit是否重复
 * Validate if there are duplicate records with the same
 * policy id,payable type,pay to, claim beneficiary
 * when adding/modifying claim beneficiary records
 */

export const VLD_000331 =
  () =>
  // policyBenefit?: PolicyBenefitModal,
  // beneficiaryItem?: BeneficiaryModal
  () =>
    // rule: any, value: any, callback: Function
    {
      // const { result, isMultiple } = duplicateBeneficiary(policyBenefit, beneficiaryItem, value);
      // if (!isMultiple) {
      //   return callback();
      // }
      // if (result) {
      //   callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000359' }));
      // }
      // callback();
    };
