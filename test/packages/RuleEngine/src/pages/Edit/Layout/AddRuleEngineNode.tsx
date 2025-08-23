import React from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { Popover, Divider } from 'antd';
import { AddType, Action } from '../Enum';

export default ({ item, position, visible, setVisible }) => {
  const globalDispatch = useDispatch();
  const { maxY: top, centerX: left, width } = position;

  return (
    <Popover
      visible={visible}
      placement="bottom"
      title="选择节点类型"
      content={
        <>
          <a
            onClick={() => {
              setVisible(false);
              globalDispatch({
                type: 'ruleEngineController/getSearchQuery',
                payload: {
                  action: Action.Edit,
                  activeCode: AddType.RuleSet,
                  params: {
                    onSearchOk: (list) => {
                      if (lodash.isArray(list) && list.length) {
                        globalDispatch({
                          type: 'ruleEngineController/flowAddRuleSet',
                          payload: {
                            item,
                            ruleSetInfo: list[0],
                          },
                        });
                      }
                    },
                  },
                },
              });
            }}
          >
            RuleSet
          </a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setVisible(false);
              globalDispatch({
                type: 'ruleEngineController/showDecisionEditData',
                payload: {
                  action: Action.Edit,
                  params: {
                    onDecisionOk: (data) => {
                      if (
                        lodash.isPlainObject(data) &&
                        lodash.isPlainObject(data.flowNodeVO) &&
                        lodash.isPlainObject(data.branchVO) &&
                        lodash.isArray(data.branchVO.branchList)
                      ) {
                        globalDispatch({
                          type: 'ruleEngineController/flowAddDecision',
                          payload: {
                            item,
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
          >
            Decision
          </a>
        </>
      }
    >
      <div style={{ position: 'absolute', top: top - 8, left: left + width / 2 }} />
    </Popover>
  );
};
