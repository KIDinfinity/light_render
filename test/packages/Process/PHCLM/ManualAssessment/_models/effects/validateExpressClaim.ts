import { NAMESPACE } from '../../activity.config';
import { VLD_001083 } from '../../validators';

export default function* validateSubmitPayable({}, { select }: any) {
  const { claimEntities, policyBenefitList } = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => ({
      claimEntities: modelNamespace.claimEntities,
      policyBenefitList: modelNamespace.claimProcessData.policyBenefitList
    })
  );
  return VLD_001083(policyBenefitList.map(id => claimEntities.policyBenefitListMap[id]), claimEntities.beneficiaryListMap);
}
