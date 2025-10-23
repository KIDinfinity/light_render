import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { Booster } from 'claim/enum/Booster';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { formUtils } from 'basic/components/Form';
import BenefitType from './BenefitType';
import styles from './index.less';

const pickData = ({ source, benefitCategory, claimPayableListMap, treatmentId, callBack }: any) => {
  const target = lodash
    .chain(source)
    .values()
    .filter(
      (item) =>
        treatmentId === item?.treatmentId &&
        item?.booster !== Booster.Yes &&
        claimPayableListMap?.[item?.payableId]?.benefitCategory === benefitCategory
    )
    .map((item) => ({
      ...item,
      benefitCategory,
      groupByKey: `${formUtils.queryValue(item?.policyNo)}${formUtils.queryValue(
        item?.benefitTypeCode
      )}`,
      claimDecision: formUtils.queryValue(claimPayableListMap?.[item?.payableId]?.claimDecision),
      viewOrder: formUtils.queryValue(claimPayableListMap?.[item?.payableId]?.viewOrder),
    }))
    .value();
  return callBack && lodash.isFunction(callBack) ? callBack(target) : target;
};

const SummaryTreatmentPayable = ({ treatmentId }: any) => {
  const claimPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap
  );
  const treatmentPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.treatmentPayableListMap
  );
  const accidentBenefitPayableMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.accidentBenefitPayableListMap
  );
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );

  const groupByCashless = pickData({
    source: treatmentPayableListMap,
    benefitCategory: eBenefitCategory.Cashless,
    claimPayableListMap,
    treatmentId,
  });
  const groupByAipa = pickData({
    source: accidentBenefitPayableMap,
    benefitCategory: eBenefitCategory.Aipa,
    claimPayableListMap,
    treatmentId,
  });
  const sourceReimbursement = pickData({
    source: serviceItemPayableListMap,
    benefitCategory: eBenefitCategory.Reimbursement,
    claimPayableListMap,
    treatmentId,
  });

  const benefitTypeList = lodash
    .chain(groupByCashless)
    .concat(groupByAipa, sourceReimbursement)
    .groupBy((item) => formUtils.queryValue(item?.benefitTypeCode))
    .map((item, key) => ({
      benefitTypeCode: key,
      groupBy: item,
      viewOrder: item?.[0]?.viewOrder,
    }))
    .orderBy('viewOrder')
    .value();

  return (
    <div className={styles.summaryPayable}>
      {lodash.map(benefitTypeList, (item, dex) => (
        <BenefitType benefitTypeData={item?.groupBy} key={item?.benefitTypeCode} />
      ))}
    </div>
  );
};

export default SummaryTreatmentPayable;
