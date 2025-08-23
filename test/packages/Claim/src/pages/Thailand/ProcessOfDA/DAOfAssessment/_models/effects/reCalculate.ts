import lodash from 'lodash';

import handleMessageModal from '@/utils/commonMessage';
import { formUtils } from 'basic/components/Form';
import Ienum from 'claim/enum';
import { Action } from '@/components/AuditLog/Enum';

export default function* reCalculate({}: any, { put, select }: any) {
  const {
    hasChangeSection,
    claimEntities,
    expectDecisionList: expectDecisionListO,
  } = yield select((state: any) => ({
    hasChangeSection: state?.daOfClaimAssessmentController?.claimProcessData?.hasChangeSection,
    expectDecisionList: state?.daOfClaimAssessmentController?.claimProcessData?.expectDecisionList,
    claimEntities: state?.daOfClaimAssessmentController.claimEntities,
  }));
  const hasChangePayable = lodash
    .chain(hasChangeSection)
    .map((item) => {
      return lodash.map(item, (self) => {
        if (lodash.size(self?.changedFieldList) > 0) {
          return {
            payableId: claimEntities?.[self?.sectionName]?.[self?.id]?.payableId || self.id,
            id: self.id,
            sectionName: self.sectionName,
          };
        }
        return null;
      });
    })
    .flatten()
    .compact()
    .value();

  let expectDecisionListTemp = lodash.map(hasChangePayable, ({ payableId, id, sectionName }) => {
    const claimPayalePart = lodash.pick(
      formUtils.cleanValidateData(claimEntities?.claimPayableListMap?.[payableId]),
      [
        'claimDecision',
        'denyCode',
        'policyNo',
        'benefitTypeCode',
        'operation',
        'remark',
        'claimNo',
        'productPlan',
        'benefitCategory',
        'policyCurrency',
        'incidentId',
        'coverageKey',
        'productCode',
        'extendLimit',
        'declineCode',
      ]
    );
    const payableItemPart = lodash.pick(
      formUtils.cleanValidateData(claimEntities?.[sectionName]?.[id]),
      ['treatmentId', 'benefitItemCode', 'policyYear', 'assessorOverrideAmount', 'operation']
    );
    const extraData: any = {};
    if (claimPayalePart.benefitCategory === 'R') {
      const invoiceId = formUtils.queryValue(claimEntities?.[sectionName]?.[id]?.invoiceId);
      const serviceId = lodash.find(
        formUtils.cleanValidateData(claimEntities?.serviceItemListMap),
        { invoiceId }
      )?.id;
      if (serviceId) {
        extraData.assessObjectId = serviceId;
      }
    }
    return {
      policyId: claimPayalePart.policyNo,
      ...lodash.omit(claimPayalePart, ['policyNo']),
      ...payableItemPart,
      ...extraData,
      operation: claimPayalePart.operation || payableItemPart.operation,
    };
  });

  // 新旧expect decision的交集（根据policyId，benefitTypeCode，productCode, benefitItem）
  const decisionIntersection = lodash
    .chain(expectDecisionListO)
    .intersectionWith(expectDecisionListTemp, (prev: any, next: any) => {
      if (prev.benefitItemCode) {
        return (
          prev.policyId &&
          prev.benefitTypeCode &&
          prev.productCode &&
          prev.benefitItemCode &&
          prev.policyId === next.policyId &&
          prev.benefitTypeCode === next.benefitTypeCode &&
          prev.productCode === next.productCode &&
          prev.benefitItemCode === next.benefitItemCode
        );
      } else {
        return (
          prev.policyId &&
          prev.benefitTypeCode &&
          prev.productCode &&
          //prev.benefitItemCode &&
          prev.policyId === next.policyId &&
          prev.benefitTypeCode === next.benefitTypeCode &&
          prev.productCode === next.productCode
        );
      }
    })
    .value();

  // 旧数据中跟decisionIntersection的补集
  const decisionListXor = lodash.xor(expectDecisionListO, decisionIntersection, lodash.isEqual);

  const compareFields = ['claimDecision', 'denyCode', 'remark'];
  let expectDecisionList = [];

  if (lodash.size(expectDecisionListO) > 0 && lodash.size(expectDecisionListTemp) < 1) {
    expectDecisionList = expectDecisionListO;
  }

  if (lodash.size(expectDecisionListO) < 1 && lodash.size(expectDecisionListTemp) > 0) {
    expectDecisionList = lodash.filter(
      expectDecisionListTemp,
      (expectDecision: any) =>
        !(!expectDecision.extendLimit && lodash.includes(expectDecision?.declineCode, 'DC172'))
    );
  }
  if (lodash.size(expectDecisionListO) > 0 && lodash.size(expectDecisionListTemp) > 0) {
    expectDecisionListTemp = lodash.filter(
      expectDecisionListTemp,
      (expectDecision: any) =>
        !(!expectDecision.extendLimit && lodash.includes(expectDecision?.declineCode, 'DC172'))
    );
    expectDecisionList = lodash
      .chain(expectDecisionListTemp)
      .map((expectDecisionN: any) => {
        // 修改行为
        if (decisionIntersection?.length > 0) {
          return lodash.map(decisionIntersection, (expectDecisionO) => {
            const decisionO = lodash.pick(expectDecisionO, compareFields);
            const decisionN = lodash.pick(expectDecisionN, compareFields);

            return lodash.isEqual(decisionO, decisionN) ? null : expectDecisionN;
          });
        }

        return expectDecisionN;
      })
      .flatten()
      .compact()
      .concat(decisionListXor)
      .filter(
        (expectDecision: any) =>
          expectDecision.policyId &&
          expectDecision.benefitTypeCode &&
          expectDecision.productCode &&
          expectDecision.operation !== Ienum.Operation.D
      )
      .value();
  }
  const response = yield put.resolve({
    type: 'commonClaimAssessmentController/reAssessment',
    payload: {
      expectDecisionList,
      isConfirm: false,
      nameSpace: 'daOfClaimAssessmentController',
      action: Action.Recalculate,
    },
  });

  if (response?.success) {
    yield put({
      type: 'clearState',
      payload: {
        clear: [
          {
            path: 'claimProcessData.expectDecisionList',
            value: expectDecisionList,
          },
          {
            path: 'claimProcessData.hasChangeSection',
            value: {},
          },
        ],
      },
    });
  } else if(response){
    handleMessageModal(lodash.get(response, 'promptMessages'));
  }
}
