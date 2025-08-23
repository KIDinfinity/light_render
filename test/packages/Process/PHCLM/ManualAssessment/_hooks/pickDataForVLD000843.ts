import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';
import { formUtils } from 'basic/components/Form';
import { getPolicyList } from 'basic/utils/PolicyUtils';
import { BenefitCategory } from 'claim/pages/utils/claim';

export default ({ incidentId }: any) => {
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap,
    shallowEqual
  );
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities,
    shallowEqual
  );
  const listPolicy = getPolicyList(NAMESPACE);

  const map: any = {
    [BenefitCategory.S]: 'procedurePayableListMap',
    [BenefitCategory.reimbursement]: 'serviceItemPayableListMap',
    [BenefitCategory.T]: 'otherProcedurePayableListMap',
    [BenefitCategory.CIC]: 'otherProcedurePayableListMap',
    [BenefitCategory.Cashless]: 'treatmentPayableListMap',
  };

  const targets = useMemo(() => {
    const matchPayableList = lodash
      .filter(claimPayableListMap, (item) => item.incidentId === incidentId)
      .map((item) => ({
        productCode: item.productCode,
        id: item.id,
        benefitCategory: item.benefitCategory,
      }));

    return lodash.map(matchPayableList, (item) => {
      const matchBenefitItemList = lodash
        .filter(
          claimEntities?.[map?.[item.benefitCategory]],
          (target) => item.id === target.payableId
        )
        .map((target) => formUtils.queryValue(target.benefitItemCode));
      return { ...item, benefititems: matchBenefitItemList };
    });
  }, [claimPayableListMap, incidentId, claimEntities]);

  const result = useMemo(() => {
    if (
      lodash.some(targets, (item) => {
        return item.productCode === 'HVS4' && lodash.includes(item.benefititems, 'PGC1');
      })
    ) {
      return (
        lodash.find(listPolicy, { coreProductCode: 'HVS4', benefitItemCode: 'PGC1' })
          ?.issueEffectiveDate || ''
      );
    }
    return '';
  }, [targets, listPolicy]);

  return result;
};
