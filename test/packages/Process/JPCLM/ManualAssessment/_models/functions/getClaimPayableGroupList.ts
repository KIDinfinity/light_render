import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import SettlementDecision from 'basic/enum/SettlementDecision';
import { eClaimDecision } from 'claim/enum/claimDecision';

const getClaimPayableGroupList = (datas: any) => {
  const incidentListMap = datas?.claimEntities?.incidentListMap;
  const claimPayableListMap = datas?.claimEntities?.claimPayableListMap;

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
        if (lodash.some(payable, (item) => item.payableAmount > 0)) {
          return SettlementDecision.approve;
        } else {
          return SettlementDecision.deny;
        }
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
          const settlementDecision = getSettlementDecision(item);
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
