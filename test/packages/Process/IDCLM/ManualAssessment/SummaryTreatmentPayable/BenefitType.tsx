import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector } from 'dva';
import lodash from 'lodash';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { Booster } from 'claim/enum/Booster';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import BenefitItem from './BenefitItem';
import { mapToBenefitItem } from '../_models/functions/utils';
import styles from './index.less';

const packData = ({ benefitCategory, benefitTypeData, serviceItemPayableListMap }: any) => {
  if (benefitCategory === eBenefitCategory.Reimbursement) {
    const sourceReimbursementBasic = lodash.filter(
      benefitTypeData,
      (item) => item?.isAdjustment !== IsAdjustment.Yes
    );
    const sourceReimbursementisAdj = lodash.filter(
      benefitTypeData,
      (item) => item?.isAdjustment === IsAdjustment.Yes
    );

    const getBoosterList = ({ key }: any) => {
      return lodash
        .chain(benefitTypeData)
        .filter((el: any) =>
          key === 'basic'
            ? el?.isAdjustment !== IsAdjustment.Yes
            : el?.isAdjustment === IsAdjustment.Yes
        )
        .map((item) => {
          const rule = lodash.pick(item, [
            'policyNo',
            'benefitItemCode',
            'productCode',
            'productPlan',
            'policyCurrency',
            'serviceItemId',
          ]);
          return (
            lodash.find(serviceItemPayableListMap, {
              ...rule,
              booster: Booster.Yes,
            }) || {}
          );
        })
        .value();
    };

    const groupByReimbursementBasic = mapToBenefitItem(
      sourceReimbursementBasic,
      eBenefitCategory.Reimbursement,
      getBoosterList({ key: 'basic' })
    );
    const groupByReimbursementAdj = mapToBenefitItem(
      sourceReimbursementisAdj,
      eBenefitCategory.Reimbursement,
      getBoosterList({ key: 'adj' })
    );
    return lodash
      .chain(groupByReimbursementBasic)
      .concat(groupByReimbursementAdj)
      .orderBy('benefitItemCode')
      .value();
  }
  return benefitTypeData;
};

const BenefitType = ({ benefitTypeData }: any) => {
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );
  const serviceItemPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.serviceItemPayableListMap
  );
  const claimDecision = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimProcessData?.claimDecision?.assessmentDecision
  );

  const { policyNo, benefitCategory }: any = lodash.pick(lodash.first(benefitTypeData), [
    'policyNo',
    'benefitCategory',
  ]);

  const data = packData({ benefitCategory, benefitTypeData, serviceItemPayableListMap });
  return (
    formUtils.queryValue(claimDecision) !== 'D' &&
    lodash.some(
      data,
      (item) =>
        formUtils.queryValue(item.claimDecision) !== 'D' &&
        formUtils.queryValue(item.claimDecision) !== 'N'
    ) && (
      <FormBorderCard
        type="weight"
        className={styles.benefitType}
        borderColor={policyBackgrounds?.[policyNo]}
      >
        {lodash.map(
          data,
          (item, index) =>
            formUtils.queryValue(item.claimDecision) !== 'D' &&
            formUtils.queryValue(item.claimDecision) !== 'N' && (
              <BenefitItem benefitItemData={item} key={`ddd${index}`} />
            )
        )}
      </FormBorderCard>
    )
  );
};

export default BenefitType;
