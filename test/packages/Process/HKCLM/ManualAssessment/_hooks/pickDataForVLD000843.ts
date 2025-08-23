import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import { getPolicyList } from 'basic/utils/PolicyUtils';
import { BenefitCategory } from 'claim/pages/utils/claim';
import moment from 'moment';
export default ({ incidentId }: any) => {
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap,
    shallowEqual
  );
  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities,
    shallowEqual
  );
  const treatmentPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.treatmentPayableListMap,
    shallowEqual
  );
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap,
    shallowEqual
  );
  const incidentListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.incidentListMap
  );

  const incidentDate = lodash.find(incidentListMap, (item) => item?.id === incidentId)
    ?.incidentDate;
  const listPolicy = getPolicyList(NAMESPACE);
  const map: any = {
    [BenefitCategory.S]: 'procedurePayableListMap',
    [BenefitCategory.reimbursement]: 'serviceItemPayableListMap',
    [BenefitCategory.T]: 'otherProcedurePayableListMap',
    [BenefitCategory.CIC]: 'otherProcedurePayableListMap',
    [BenefitCategory.cashless]: 'treatmentPayableListMap',
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
      return lodash.filter(
        claimEntities?.[map?.[item.benefitCategory]],
        (target) => item.id === target.payableId
      );
    });
  }, [claimPayableListMap, incidentId, claimEntities]);

  const result = useMemo(() => {
    return lodash
      .chain(lodash.flatten(targets))
      .filter((item) => item?.incidentId === incidentId && item?.benefitGroupCode === 'PYINWAITPRD')
      .reduce((isWran: boolean, payableItem: any) => {
        const hasSome = lodash
          .chain(listPolicy)
          .find(({ productCode, benefitItemCode, issueEffectiveDate }: any) => {
            const currentDate = moment(incidentDate).format('YYYY-MM-DD');
            const targetDate = moment(issueEffectiveDate).format('YYYY-MM-DD');
            const targetDateAfterYear = moment(issueEffectiveDate)
              .add(1, 'year')
              .format('YYYY-MM-DD');
            return (
              payableItem.coreProductCode === productCode &&
              payableItem?.benefitItemCode === benefitItemCode &&
              moment(currentDate).isBetween(targetDate, targetDateAfterYear, undefined, '[]')
            );
          })
          .value();
        return !!hasSome ? true : isWran;
      }, false)
      .value();
  }, [treatmentPayableListMap, serviceItemPayableListMap, incidentId, listPolicy]);
  return result;
};
