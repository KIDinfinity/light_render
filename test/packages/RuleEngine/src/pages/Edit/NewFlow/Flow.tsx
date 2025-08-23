import React from 'react';
import lodash from 'lodash';
import G6Editor, {
  RuleEngineNodeEnhanceFlow,
  RuleEngineNodeEnhanceNodeType,
  RULEENGINENODEENHANCE_PREFIX,
  EditNode,
} from '@ctc/g6-editor';
import { useDispatch } from 'dva';
import { TransToFlow, AfterCommand } from './Functions';
import Component from './Component';
import { ComponentType, CommandName, OptionType } from './Enum';
import { AddType } from '../Enum';

import styles from './index.less';

interface IProps {
  flowNodeVOs: any;
  branchVOs: any;
  taskNotEditable: boolean;
  handleRuleFlow: Function;
  handleCondition: Function;
  handleComponentClick: Function;
  handleCommandAdd: Function;
}

export default ({
  taskNotEditable,
  flowNodeVOs,
  branchVOs,
  handleRuleFlow,
  handleCondition,
  handleComponentClick,
  handleCommandAdd,
}: IProps) => {
  const globalDispatch = useDispatch();

  const graphData = TransToFlow(flowNodeVOs, branchVOs, taskNotEditable);
  console.log('flowNodeVOs', flowNodeVOs);
  console.log('branchVOs', branchVOs);
  console.log('graphData', graphData);
  const addComponent = async ({ name, params, graph }: any) => {
    let newType = '';
    const { type } = params.model;

    switch (type) {
      case `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.RuleSetNode}`:
        await globalDispatch({
          type: 'ruleEngineController/getSearchQuery',
          payload: {
            activeCode: AddType.NewRuleSet,
          },
        });
        await handleCommandAdd(ComponentType.Rule);
        break;
      case `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.BranchNode}`:
        await handleCommandAdd(ComponentType.Decision);
        break;
      case `${RULEENGINENODEENHANCE_PREFIX}-${RuleEngineNodeEnhanceNodeType.EndNode}`:
        newType = ComponentType.End;
        // End节点
        await globalDispatch({
          type: 'ruleEngineController/saveNewFlowSumbit',
          payload: {
            ...AfterCommand({ name, params, graph, type }),
          },
        });

        break;

      default:
        break;
    }
  };

  return (
    <div className={styles.flow}>
      <G6Editor
        onAfterExecuteCommand={({ name, params, changeData, graph, type }: any) => {
          if (name === CommandName.ADD) {
            addComponent({ name, params, graph });
          } else if (changeData && !taskNotEditable) {
            globalDispatch({
              type: 'ruleEngineController/saveNewFlowSumbit',
              payload: {
                ...AfterCommand({ name, params, graph, type }),
              },
            });
          }
        }}
      >
        {/* 元件面板 */}
        <Component taskNotEditable={taskNotEditable} handleClick={handleComponentClick} />
        {/* 画布 */}
        <RuleEngineNodeEnhanceFlow
          className={styles.graph}
          ref={(component) => {
            if (component) {
              // console.log('graph:', component.graph);
            }
          }}
          data={graphData}
          submitData={{ flowNodeVOs, branchVOs }}
          locale={{
            needEdge: '[ERR_000280]Please link it to the node!',
          }}
          onGraphInit={() => {}}
        />

        {/* 注册EditNode-RuleSet的View|Edit|Delete回调 */}
        <EditNode
          type={RuleEngineNodeEnhanceNodeType.RuleSetNode}
          onClick={({ model }) => {
            if (model.ruleReferenceId && !taskNotEditable) {
              handleRuleFlow({
                ruleReferenceId: model.ruleReferenceId,
                type: ComponentType.Rule,
                disabled: false,
              });
            }
          }}
        />
        {/* 注册BranchNode的View|Edit|Delete回调 */}
        <EditNode
          type={RuleEngineNodeEnhanceNodeType.BranchNode}
          onClick={({ model }) => {
            const { id } = model;
            if (id && !lodash.isEmpty(id) && !taskNotEditable) {
              handleCondition({
                ruleReferenceId: model.ruleReferenceId,
                type: ComponentType.Decision,
                optionType: OptionType.UPDATE,
                branchId: id,
                disabled: false,
              });
            }
          }}
          onAdd={({ model }) => {
            const { id } = model;
            if (id && !lodash.isEmpty(id) && !taskNotEditable) {
              handleCondition({
                type: ComponentType.Branch,
                optionType: OptionType.ADD,
                branchId: id,
                disabled: false,
              });
            }
          }}
        />
      </G6Editor>
    </div>
  );
};
