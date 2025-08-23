import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import { AddType } from '../Enum';
import { ComponentType, OptionType } from './Enum';
import { AddRule, UpdateRule, AddDecision, UpdateBranch, AddBranch, AddEnd } from './Functions';
import Search from './Search';
import Flow from './Flow';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();

  const initSearch = () => {
    return {
      // 是否显示
      show: false,
      // 操作类型
      optionType: '',
      // 弹窗类型(rule/condition)
      type: '',
      // 搜索ruleSet唯一标示
      ruleReferenceId: '',
      // 搜索branch唯一标示
      branchId: '',
    };
  };

  const [search, setSearch] = useState(initSearch());

  const submitRuleSet = useSelector((state: any) => state.ruleEngineController.submitRuleSet || {});
  const conditionList = useSelector(
    (state: any) => state.ruleEngineController.newRulFlow?.conditionList || {}
  );
  const branchInfo = useSelector(
    (state: any) => state.ruleEngineController.newRulFlow?.branchInfo || {}
  );

  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable || false);

  const flowNodeVOs = submitRuleSet?.flowNodeVOs || [];
  const branchVOs = submitRuleSet?.branchVOs || [];

  useEffect(() => {
    dispatch({
      type: 'ruleEngineController/saveNewRuleFlowInitFlow',
    });
  }, []);

  // 点击confirn添加数据
  const handleConfirn = async (record: any) => {
    switch (search.type) {
      case ComponentType.Rule:
        switch (search.optionType) {
          case OptionType.ADD:
            await dispatch({
              type: 'ruleEngineController/saveNewFlowSumbit',
              payload: {
                ...AddRule({ record, flowNodeVOs, branchVOs }),
              },
            });
            break;
          case OptionType.UPDATE:
            await dispatch({
              type: 'ruleEngineController/saveNewFlowSumbit',
              payload: {
                ...UpdateRule({ record, ruleReferenceId: search.ruleReferenceId, flowNodeVOs }),
              },
            });
            break;

          default:
            break;
        }
        break;
      case ComponentType.Decision:
        switch (search.optionType) {
          case OptionType.ADD:
            await dispatch({
              type: 'ruleEngineController/saveNewFlowSumbit',
              payload: {
                ...AddDecision({ flowNodeVOs, branchVOs, branchInfo, conditionList }),
              },
            });
            break;
          case OptionType.UPDATE:
            await dispatch({
              type: 'ruleEngineController/saveNewFlowSumbit',
              payload: {
                ...UpdateBranch({
                  flowNodeVOs,
                  branchVOs,
                  branchId: search.branchId,
                  conditionList,
                  branchInfo,
                }),
              },
            });

            break;

          default:
            break;
        }
        break;
      case ComponentType.Branch:
        await dispatch({
          type: 'ruleEngineController/saveNewFlowSumbit',
          payload: {
            ...AddBranch({
              flowNodeVOs,
              branchVOs,
              branchId: search.branchId,
              conditionList,
              branchInfo,
            }),
          },
        });
        break;
      default:
        break;
    }

    await setSearch(initSearch());
  };

  // 新增元件
  const handleComponentClick = async (type: string) => {
    switch (type) {
      case ComponentType.Rule:
        await dispatch({
          type: 'ruleEngineController/getSearchQuery',
          payload: {
            activeCode: AddType.NewRuleSet,
          },
        });
        break;
      case ComponentType.Decision:
        break;
      default:
        // End节点
        dispatch({
          type: 'ruleEngineController/saveNewFlowSumbit',
          payload: {
            flowNodeVOs: AddEnd({ flowNodeVOs, branchVOs }),
          },
        });
        break;
    }
    if (type !== ComponentType.End) {
      await setSearch({
        show: true,
        optionType: OptionType.ADD,
        type,
        ruleReferenceId: '',
        branchId: '',
      });
    }
  };

  // 编辑查看ruleSet
  const handleRuleFlow = async ({ ruleReferenceId, type }: any) => {
    await dispatch({
      type: 'ruleEngineController/getSearchQuery',
      payload: {
        activeCode: AddType.NewRuleSet,
      },
    });
    await setSearch({
      show: true,
      type,
      optionType: OptionType.UPDATE,
      ruleReferenceId,
      branchId: '',
    });
  };

  // 编辑/查看Condition
  const handleCondition = ({ branchId, type, optionType }: any) => {
    setSearch({
      show: true,
      type,
      optionType,
      ruleReferenceId: '',
      branchId,
    });
  };

  return (
    <div className={styles.container}>
      <Flow
        flowNodeVOs={flowNodeVOs}
        branchVOs={branchVOs}
        taskNotEditable={taskNotEditable}
        handleRuleFlow={handleRuleFlow}
        handleCondition={handleCondition}
        handleComponentClick={handleComponentClick}
        handleCommandAdd={(type: string) => {
          setSearch({
            show: true,
            optionType: OptionType.ADD,
            type,
            ruleReferenceId: '',
            branchId: '',
          });
        }}
      />
      <Search
        search={search}
        handleConfirn={(record: any) => {
          handleConfirn(record);
        }}
        handleCancel={() => {
          setSearch(initSearch());
        }}
      />
    </div>
  );
};
