import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, FormLayoutContext } from 'basic/components/Form';
import { Booster } from 'claim/enum/Booster';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import TreatmentPayable from './TreatmentPayable';
import Link from './Link';

import styles from './Payable.less';

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
    .value();
  return callBack && lodash.isFunction(callBack) ? callBack(target) : target;
};

const PayableList = ({ treatmentId }: any) => {
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

  const treatmentPayableList = pickData({
    source: treatmentPayableListMap,
    benefitCategory: eBenefitCategory.Cashless,
    claimPayableListMap,
    treatmentId,
    callBack: (target: any) =>
      lodash.map(target, (item) => ({
        ...item,
        benefitCategory: eBenefitCategory.Cashless,
        claimDecision: claimPayableListMap?.[item?.payableId]?.claimDecision,
        coverageKey: claimPayableListMap?.[item?.payableId]?.coverageKey,
      })),
  });
  const accidentBenefitPayableList = pickData({
    source: accidentBenefitPayableMap,
    benefitCategory: eBenefitCategory.Aipa,
    claimPayableListMap,
    treatmentId,
    callBack: (target: any) =>
      lodash.map(target, (item) => ({
        ...item,
        benefitCategory: eBenefitCategory.Aipa,
        claimDecision: claimPayableListMap?.[item?.payableId]?.claimDecision,
        coverageKey: claimPayableListMap?.[item?.payableId]?.coverageKey,
      })),
  });

  const data = lodash.concat(treatmentPayableList, accidentBenefitPayableList);

  return (
    lodash.size(data) > 0 &&
    lodash.some(data, (item) => formUtils.queryValue(item.claimDecision) !== 'D') && (
      <Link>
        <FormLayoutContext.ExpandProvider>
          <div className={styles.payableList}>
            <FormLayoutContext.ExpandIcon className={styles.expandIcon} />
            {lodash.map(
              data,
              (item) =>
                item.claimDecision !== 'D' && <TreatmentPayable item={item} key={item?.id} />
            )}
          </div>
        </FormLayoutContext.ExpandProvider>
      </Link>
    )
  );
};

export default PayableList;
