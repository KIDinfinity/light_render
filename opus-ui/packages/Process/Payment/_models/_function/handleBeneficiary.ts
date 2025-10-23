import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { EPayTo, ERelationshipWithInsured } from '../_dto/Enums';

const handleBeneficiary = (beneficiary: any = {}, payTo?: string) => {
  if (!payTo || !lodash.isString(payTo)) return beneficiary;
  const beneficiaryTemp = { ...beneficiary };
  const payToMapInsured = () => {
    const payToMapWithInsured = {
      [EPayTo.Policyholder]: ERelationshipWithInsured.PolicyOwner,
      [EPayTo.Beneficiary]: ERelationshipWithInsured.Beneficiary,
      [EPayTo.Insured]: ERelationshipWithInsured.Self,
    };

    beneficiaryTemp.relationshipWithInsured = payToMapWithInsured[payTo]
      ? payToMapWithInsured[payTo]
      : ERelationshipWithInsured.Others;
  };

  tenant.region({
    [Region.HK]: payToMapInsured,
    [Region.JP]: payToMapInsured,
    [Region.TH]: payToMapInsured,
    [Region.ID]: payToMapInsured,
  });

  return beneficiaryTemp;
};

export default handleBeneficiary;
