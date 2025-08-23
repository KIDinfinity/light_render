import lodash from 'lodash';
import { v4 as uuid } from 'uuid';
import { formUtils } from 'basic/components/Form';
import type { BeneficiaryModal } from '../_dto/Models';
import { Beneficiary } from '../_dto/Consts';
import { EPayTo } from '../_dto/Enums';
// import { getBeneficiaryName } from '.';
/**
 * 根据payTo生成对应的beneficiary数据对象
 * @param claimData claim data数据(C360的beneficiary相关数据)
 * @param payTo payTo值
 * @param policyNo policyNo值
 * @param policyNo beneficiary对象
 */
const getBeneficiary = (
  claimData: any,
  payTo?: string,
  policyNo?: string,
  beneficiaryExsit?: BeneficiaryModal
) => {
  const { c360BeneficiaryInfo = {} } = claimData;
  if (!lodash.isString(policyNo) || lodash.isEmpty(c360BeneficiaryInfo)) return beneficiaryExsit;

  const { claimInsuredIdDO = {}, policyBeneficiaryList = [], policyOwnerList = [] } =
    c360BeneficiaryInfo || {};

  const isBeneficiary = payTo === EPayTo.Beneficiary;
  const isInsured = payTo === EPayTo.Insured;
  const isPolicyholder = payTo === EPayTo.Policyholder;
  const id = uuid();
  let beneficiaryO: BeneficiaryModal | any = { ...(beneficiaryExsit || {}) } || { beneficiary: '' };
  const clientId = formUtils.queryValue(beneficiaryO?.clientId);
  let beneficiaryC360: BeneficiaryModal = {};

  if (isBeneficiary && clientId) {
    beneficiaryC360 = lodash.find(policyBeneficiaryList, { policyId: policyNo, clientId });
    beneficiaryO = {
      ...beneficiaryO,
      ...beneficiaryC360,
    };
  } else if (isInsured) {
    const { insuredId } = claimInsuredIdDO || {};
    beneficiaryO = {
      ...beneficiaryO,
      ...claimInsuredIdDO,
      clientId: clientId ? beneficiaryO?.clientId : insuredId,
    };
  } else if (isPolicyholder && clientId) {
    beneficiaryC360 = lodash.find(policyOwnerList, { policyId: policyNo, clientId });

    beneficiaryO = {
      ...beneficiaryO,
      ...beneficiaryC360,
    };
  }

  return { ...Beneficiary, ...beneficiaryO, payTo, id };
};

export default getBeneficiary;
