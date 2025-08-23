import React, { useMemo } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getPayableList } from 'claim/pages/utils/selector';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import { eBenefitSubCategory } from 'claim/enum/BenefitSubCategory';
import Add from './Add';
import AddField from './AddField';
import Adjustment from './Adjustment';
import HPAdjustment from './HPAdjustment';
import Default from './Default';
import Outpatient from './Outpatient';
import { useSelector } from 'dva';
import styles from './index.less';

const TreatmentPayableList = ({ treatmentId, incidentId }: any) => {
  const treatmentPayableAddItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.treatmentPayableAddItem
  );
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const treatmentPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment?.claimEntities?.treatmentPayableListMap
  );

  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities.claimPayableListMap
  );

  const getTreatmentPayableList = useMemo(() => {
    return getPayableList('treatmentId', treatmentId, treatmentPayableListMap);
  }, [treatmentPayableListMap]);

  const isBelongToCurrentItem =
    treatmentPayableAddItem && treatmentId === treatmentPayableAddItem.treatmentId;

  const curTreatmentPayableIdList = lodash
    .chain(getTreatmentPayableList)
    .map((item) => item.id)
    .value();

  const RenderList = () => {
    // 获取需要展示的列表
    const showList = lodash
      .chain(curTreatmentPayableIdList)
      .map((id: string) => ({
        ...(treatmentPayableListMap?.[id] || {}),
      }))
      .filter((treatmentItem: any) => {
        const claimPayable = lodash.get(claimPayableListMap, `${treatmentItem.payableId}`) || {};
        return lodash.includes(
          [eBenefitCategory.Cashless, eBenefitCategory.LumpSum],
          claimPayable?.benefitCategory
        );
      })
      .value();

    const IPPayableList: any = [];

    const newRender = lodash.map(showList, (treatmentPayableItem: any) => {
      const claimPayable =
        lodash.get(claimPayableListMap, `${treatmentPayableItem.payableId}`) || {};
      const { id, benefitSubCategory, isAdjustment } = treatmentPayableItem;
      const policyYear = formUtils.queryValue(claimPayable.policyYear);

      // 默认展示
      if (isAdjustment !== 'Y') {
        // OP展示
        if (benefitSubCategory === eBenefitSubCategory.OP) {
          return (
            <Outpatient
              treatmentId={treatmentId}
              treatmentPayableItemId={id}
              policyYear={policyYear}
              key={id}
              incidentId={incidentId}
              curTreatmentPayableList={getTreatmentPayableList}
            />
          );
        }
        // 默认展示
        return (
          <Default
            treatmentPayableItemId={id}
            policyYear={policyYear}
            incidentId={incidentId}
            treatmentId={treatmentId}
            key={`${id}-outpatient`}
            treatmentPayable={treatmentPayableItem}
            claimPayable={claimPayable}
            curTreatmentPayableList={getTreatmentPayableList}
          />
        );
      }
      // 展示adj
      if (isAdjustment === 'Y') {
        if (benefitSubCategory === eBenefitSubCategory.OP) {
          return (
            <Adjustment
              policyYear={policyYear}
              key={`${id}-outpatient`}
              curTreatmentPayableList={getTreatmentPayableList}
              treatmentPayableItem={treatmentPayableItem}
            />
          );
        } else {
          IPPayableList.push(id);
          return <></>;
        }
      }
    });
    return lodash.isEmpty(IPPayableList) ? newRender : <HPAdjustment payableIds={IPPayableList} />;
  };

  const treatmentPayableItemFirst = treatmentPayableListMap[curTreatmentPayableIdList[0]] || {};

  return (
    <div className={styles.payableWrap}>
      {RenderList()}

      {treatmentPayableAddItem && isBelongToCurrentItem && (
        <Add
          //@ts-ignore
          treatmentPayableItemDetail={treatmentPayableAddItem}
          curTreatmentPayableList={getTreatmentPayableList}
          incidentId={incidentId}
          treatmentId={treatmentId}
        />
      )}
      {editable && treatmentPayableItemFirst.isAdjustment !== 'Y' && (
        <AddField incidentId={incidentId} treatmentId={treatmentId} />
      )}
    </div>
  );
};

export default TreatmentPayableList;
