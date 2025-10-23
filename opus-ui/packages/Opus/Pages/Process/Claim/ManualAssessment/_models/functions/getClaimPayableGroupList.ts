import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import SettlementDecision from 'basic/enum/SettlementDecision';
import { settlementDecision as settlementDecisionEnum } from 'claim/pages/Enum';
import { eClaimDecision } from 'claim/enum/claimDecision';
import { SourceSystem } from 'process/Enum';

const getClaimPayableGroupList = (datas: any) => {
  const incidentListMap = datas?.claimEntities?.incidentListMap;
  const claimPayableListMap = datas?.claimEntities?.claimPayableListMap;

  const getDefaultLifejDecision = (payable: any) => {
    if (lodash.every(payable, (item) => item.isAdjustment !== 'Y')) {
      const firstItemDecision = payable?.[0]?.settlementDecision;

      if (lodash.every(payable, (item) => item.settlementDecision === firstItemDecision)) {
        return firstItemDecision;
      }

      if (lodash.every(payable, (item) => item.settlementDecision === settlementDecisionEnum.NE)) {
        return settlementDecisionEnum.NE;
      }

      return settlementDecisionEnum.PI;
    }
    return '';
  };

  const getSettlementDecision = (payable: any) => {
    if (lodash.some(payable, (item) => item.benefitSubCategory === 'WOP')) {
      const Deny = lodash.every(payable, (item) => {
        return formUtils.queryValue(item?.claimDecision) === eClaimDecision.deny;
      });
      const Approve = lodash.some(payable, (item) => {
        return formUtils.queryValue(item?.claimDecision) === eClaimDecision.approve;
      });
      const Pending = lodash.some(payable, (item) => {
        return formUtils.queryValue(item?.claimDecision) === eClaimDecision.pending;
      });
      if (Deny) return SettlementDecision.deny;
      if (Approve || Pending) return SettlementDecision.approve;
    } else {
      if (lodash.every(payable, (item) => item.isAdjustment !== 'Y')) {
        if (
          lodash.every(payable, (item) => item.settlementDecision === settlementDecisionEnum['03'])
        ) {
          return settlementDecisionEnum['03'];
        }

        return settlementDecisionEnum['01'];
      }
    }
    return '';
  };

  const incidentList = lodash.keys(incidentListMap);

  let claimPayableGroupList = {};

  lodash.forEach(incidentList, (incidentId) => {
    claimPayableGroupList = {
      ...claimPayableGroupList,
      ...lodash
        .chain(claimPayableListMap)
        .filter({ incidentId })
        .groupBy((el: any) => formUtils.queryValue(el?.policyNo))
        .reduce((obj, item: any) => {
          const { id, policyNo, detailedAssessmentDecision } = item?.[0] || {};

          const isLifeJ =
            (lodash.find(datas.claimEntities?.beneficiaryListMap, { policyNo: policyNo })
              ?.sourceSystem ||
              lodash.find(datas.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList, {
                policyId: policyNo,
              })?.sourceSystem ||
              datas.claimProcessData?.insured?.policySource) === SourceSystem.Lifej;

          const settlementDecision = isLifeJ
            ? getDefaultLifejDecision(item)
            : getSettlementDecision(item);

          return {
            ...(obj || {}),
            [`${incidentId}.${policyNo}`]: {
              detailedAssessmentDecision,
              settlementDecision,
              policyNo,
              incidentId,
              claimPayableId: id,
            },
          };
        }, {})
        .value(),
    };
  });

  lodash.forEach(lodash.values(claimPayableGroupList), (GroupItem: any) => {
    datas.claimEntities.claimPayableListMap[GroupItem.claimPayableId].settlementDecision =
      GroupItem.settlementDecision;
  });

  return {
    ...(datas.claimPayableGroupList || {}),
    ...claimPayableGroupList,
  };
};

export default getClaimPayableGroupList;
