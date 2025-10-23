import React from 'react';
import lodash from 'lodash';
import { Card } from 'antd';
import { useDispatch } from 'dva';
import G6Editor, { RuleEngineFlow, RuleEngineNodeType, AddItemPopover, EditNode } from '@ctc/g6-editor';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { serverDataToUI } from './ruleFlowDataTransfer';
import AddRuleEngineNode from './AddRuleEngineNode';
import Modals from '../Modals';
import RuleSetModal from '../Modals/RuleSet';
import { AddType, Action } from '../Enum';
import styles from './RuleFlowEditor.less';

export default ({ flowNodeVOs, branchVOs, taskNotEditable, modalStatus }: any) => {
  const globalDispatch = useDispatch();

  const graphData = serverDataToUI(flowNodeVOs, branchVOs, taskNotEditable);

  return (
    <div className={styles.ruleFlowWrap}>
      <Card
        title={formatMessageApi({
          label: 'Decision Flow',
        })}
      >
        <div className={styles.content}>
          <G6Editor
            onAfterExecuteCommand={({ name, params, changeData, data, graph }) => {
              if (changeData) {
                globalDispatch({
                  type: 'ruleEngineController/flowAfterCommand',
                  payload: {
                    name,
                    params,
                    changeData,
                    data,
                    flowNodeVOs,
                    branchVOs,
                    graph,
                  },
                });
              }
            }}
          >
            {/* 画布 */}
            <RuleEngineFlow
              className={styles.graph}
              ref={(component) => {
                if (component) {
                  // console.log('graph:', component.graph);
                }
              }}
              data={graphData}
              locale={{
                needEdge: '[ERR_000280]Please link it to the node!',
              }}
              onGraphInit={(graph) => {
                globalDispatch({
                  type: 'ruleEngineController/flowInitGraph',
                  payload: graph,
                });
              }}
            />
            {/* 新增RuleEngine-Node操作的弹框 */}
            {!taskNotEditable && (
              <AddItemPopover
                renderContent={(item, position, visible, setVisible) => (
                  <AddRuleEngineNode
                    item={item}
                    position={position}
                    visible={visible}
                    setVisible={setVisible}
                  />
                )}
              />
            )}

            {/* 注册EditNode-Decision的View|Edit|Delete回调 */}
            <EditNode
              type={RuleEngineNodeType.DecisionNode}
              onView={({ model }) => {
                globalDispatch({
                  type: 'ruleEngineController/showDecisionEditData',
                  payload: {
                    action: Action.View,
                    params: {
                      nodeId: model.id,
                      onDecisionOk: (data) => {
                        if (
                          lodash.isPlainObject(data) &&
                          lodash.isPlainObject(data.flowNodeVO) &&
                          lodash.isPlainObject(data.branchVO) &&
                          lodash.isArray(data.branchVO.branchList)
                        ) {
                          globalDispatch({
                            type: 'ruleEngineController/flowEditDecision',
                            payload: {
                              nodeId: model.id,
                              flowNodeVO: data.flowNodeVO,
                              branchVO: data.branchVO,
                            },
                          });
                        }
                      },
                    },
                  },
                });
              }}
              onEdit={({ model }) => {
                globalDispatch({
                  type: 'ruleEngineController/showDecisionEditData',
                  payload: {
                    action: Action.Edit,
                    params: {
                      nodeId: model.id,
                      onDecisionOk: (data) => {
                        if (
                          lodash.isPlainObject(data) &&
                          lodash.isPlainObject(data.flowNodeVO) &&
                          lodash.isPlainObject(data.branchVO) &&
                          lodash.isArray(data.branchVO.branchList)
                        ) {
                          globalDispatch({
                            type: 'ruleEngineController/flowEditDecision',
                            payload: {
                              nodeId: model.id,
                              flowNodeVO: data.flowNodeVO,
                              branchVO: data.branchVO,
                            },
                          });
                        }
                      },
                    },
                  },
                });
              }}
            />
            {/* 注册EditNode-RuleSet的View|Edit|Delete回调 */}
            <EditNode
              type={RuleEngineNodeType.RuleSetNode}
              isShowView
              onView={({ model }) => {
                if (model.ruleReferenceId) {
                  globalDispatch({
                    type: 'ruleEngineController/saveRuleSetModalData',
                    payload: {
                      id: model.ruleReferenceId,
                    },
                  });
                }
              }}
              onEdit={({ model }) => {
                if (model.ruleReferenceId) {
                  globalDispatch({
                    type: 'ruleEngineController/getSearchQuery',
                    payload: {
                      activeCode: AddType.RuleSet,
                      params: {
                        ruleSetId: model.ruleReferenceId,
                        onSearchOk: (list) => {
                          if (lodash.isArray(list) && list.length && list[0].id) {
                            globalDispatch({
                              type: 'ruleEngineController/flowEditRuleSet',
                              payload: {
                                nodeId: model.id,
                                ruleSetInfo: list[0],
                              },
                            });
                          }
                        },
                      },
                    },
                  });
                }
              }}
            />
          </G6Editor>
        </div>
      </Card>
      {modalStatus?.isRuleSet && <RuleSetModal />}
      <Modals />
    </div>
  );
};
