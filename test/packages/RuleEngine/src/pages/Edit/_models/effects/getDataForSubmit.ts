import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';
import { fe2be } from '../functions/flowDataMapping';
import { RuleSetType } from '../../Enum';
// eslint-disable-next-line import/no-named-as-default
import CaseCategory from 'claim/pages/CaseCategory';

export default function* (_: any, { select }: any) {
  let { submitRuleSet } = yield select((state: any) => ({
    submitRuleSet: state.ruleEngineController.submitRuleSet,
  }));
  const caseCategory = yield select((state: any) => state.processTask.getTask?.caseCategory);
  submitRuleSet = formUtils.cleanValidateData(submitRuleSet);
  const ruleSetType = submitRuleSet?.ruleSetInfo?.ruleSetType || '';

  if (lodash.isPlainObject(submitRuleSet) && lodash.isArray(submitRuleSet.flowNodeVOs)) {
    const startNodeVO = lodash.find(submitRuleSet.flowNodeVOs, (item) => item.nodeIdParent === '0');
    submitRuleSet.flowNodeVOs = lodash
      .chain(submitRuleSet.flowNodeVOs)
      .filter((item) => item.nodeIdParent !== '0')
      .map((item) => {
        if (item.nodeIdParent === startNodeVO.nodeId) {
          return {
            ...item,
            nodeIdParent: '0',
          };
        }

        return item;
      })
      .value();
  }

  // flow模式不需要groups
  if (!lodash.isEmpty(ruleSetType) && ruleSetType === RuleSetType.RuleFlow) {
    submitRuleSet.groups = [];
  }

  // 重新设置id
  if (caseCategory === CaseCategory.RulesChange) {
    const newBranchVOs = submitRuleSet.branchVOs || [];
    const newFlowNodeVOs = submitRuleSet.flowNodeVOs || [];

    const branchNodeIds = lodash.uniq(lodash.map(newBranchVOs, (item: any) => item.nodeId));
    const branchIdVos = lodash.uniq(lodash.map(newBranchVOs, (item: any) => item.id));
    const FlowNodeIds = lodash.uniq(lodash.map(newFlowNodeVOs, (item: any) => item.nodeId));

    const FlowParentIds = lodash.uniq(lodash.map(newFlowNodeVOs, (item: any) => item.nodeIdParent));

    const idsArr = lodash.uniq(
      lodash.concat(branchNodeIds, branchIdVos, FlowNodeIds, FlowParentIds)
    );

    const idsObj = lodash.reduce(
      idsArr,
      (obj: any, param: any) => {
        // eslint-disable-next-line no-param-reassign
        obj[`${param}`] = uuidv4();

        return obj;
      },
      {}
    );


    submitRuleSet = {
      ...submitRuleSet,
      branchVOs: lodash.map(newBranchVOs, (item: any) => {
        return {
          ...item,
          id: idsObj[item.id],
          nodeId: idsObj[item.nodeId],
        };
      }),
      flowNodeVOs: lodash.map(newFlowNodeVOs, (item: any) => {
        return {
          ...item,
          id: idsObj[item.id],
          nodeId: item.nodeId === '999' ? item.nodeId : idsObj[item.nodeId],
          decisionBranchId: idsObj[item.decisionBranchId]
            ? idsObj[item.decisionBranchId]
            : item.decisionBranchId,
          nodeIdParent: item.nodeIdParent === '0' ? item.nodeIdParent : idsObj[item.nodeIdParent],
        };
      }),
    };
  }

  const data = fe2be(submitRuleSet);

  return data;
}
