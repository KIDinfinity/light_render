import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { BenefitCategory, BenefitSubCategory } from 'claim/pages/utils/claim';
import { add } from '@/utils/precisionUtils';
import Group from './Group';
import Item from './Item';
import Add from './Add';

const ClaimPayableList = ({ incidentId, hasTreatment }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const claimPayableListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.claimEntities?.claimPayableListMap
  );
  const claimEntities = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.claimEntities || {}
  );

  const listPolicy = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.listPolicy
  );
  const claimPayableGroupList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimPayableGroupList
  );
  const claimNo = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment?.claimProcessData?.claimNo
  );

  // 汇总PayableAmount
  const sumPayableAmount = ({ claimPayableList }: any) => {
    const mapData: any = {
      [BenefitCategory.cashless]: 'treatmentPayableListMap',
      [BenefitCategory.LumpSum]: 'treatmentPayableListMap',
      [BenefitSubCategory.OP]: 'opTreatmentPayableListMap',
      [BenefitCategory.T]: 'otherProcedurePayableListMap',
      [BenefitCategory.CIC]: 'otherProcedurePayableListMap',
      [BenefitCategory.S]: 'procedurePayableListMap',
      [BenefitCategory.MajorIllnessCashBenefit]: 'claimIncidentPayableListMap',

      [BenefitCategory.reimbursement]: 'serviceItemPayableListMap',
    };

    return lodash.reduce(
      claimPayableList,
      (total: number, item: any) => {
        const { benefitCategory, benefitSubCategory } = item || {};
        const chilSumAmount = lodash
          .chain(
            lodash.values(
              benefitSubCategory === BenefitSubCategory.OP
                ? claimEntities?.[mapData?.[benefitSubCategory]]
                : claimEntities?.[mapData?.[benefitCategory]]
            ) || []
          )
          .filter((el: any) => el.payableId === item.id && Number(el.payableAmount) > 0)
          .reduce((itemTotal: number, childItem: any) => {
            return add(itemTotal, childItem?.payableAmount || 0);
          }, 0)
          .value();
        return add(total, chilSumAmount || 0);
      },
      0
    );
  };
  const mapList = useMemo(() => {
    return lodash
      .chain(claimPayableListMap)
      .filter({ incidentId })
      .groupBy((el: any) => formUtils.queryValue(el?.policyNo))
      .map((item: any) => {
        const payableAmount = sumPayableAmount({ claimPayableList: item });
        const changeObjectAmount = lodash.reduce(
          item,
          (result, reItem) => add(result, reItem?.changeObjectAmount),
          0
        );
        const mainProductCode = lodash.get(item, '0', {})?.mainProductCode;
        const policyNo = lodash.get(item, '0', {}).policyNo;

        return {
          payableAmount,
          mainProductCode,
          policyNo,
          payableIds: lodash
            .chain(item)
            .sortBy('viewOrder')
            .map((i: any) => {
              return { id: i.id };
            })
            .value(),
          changeObjectAmount,
        };
      })
      .value();
  }, [claimPayableListMap, incidentId]);

  const payableListNode = useMemo(() => {
    return lodash.map(mapList, (item: any) => {
      return item.policyNo ? (
        <Group
          key={item?.policyNo}
          claimPayableListMap={claimPayableListMap}
          targets={item}
          claimPayableGroupList={claimPayableGroupList}
          incidentId={incidentId}
        >
          {lodash.map(item.payableIds, (target) => (
            <Item
              key={target?.id}
              incidentPayableId={target?.id}
              hasTreatment={hasTreatment}
              incidentId={incidentId}
              noPolicyNo
            />
          ))}
        </Group>
      ) : (
        <>
          {lodash.map(item.payableIds, (target) => (
            <Item
              key={target?.id}
              incidentPayableId={target?.id}
              hasTreatment={hasTreatment}
              incidentId={incidentId}
            />
          ))}
        </>
      );
    });
  }, [mapList, hasTreatment, incidentId, listPolicy, claimPayableListMap]);

  return (
    <div>
      {payableListNode}
      {editable && <Add hasTreatment={hasTreatment} incidentId={incidentId} claimNo={claimNo} />}
    </div>
  );
};

export default ClaimPayableList;
