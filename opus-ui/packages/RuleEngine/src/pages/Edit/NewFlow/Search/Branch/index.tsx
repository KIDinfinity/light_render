import React, { useEffect } from 'react';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import Info from './Info';
import Condition from './Condition';
import { OptionType } from '../../Enum';
import styles from './index.less';

interface IProps {
  branchId: string;
  optionType: string;
}

export default ({ branchId, optionType }: IProps) => {
  const dispatch = useDispatch();

  const newConditionList = useSelector(
    (state: any) => state.ruleEngineController.newRulFlow?.conditionList || []
  );
  const branchVOs = useSelector(
    (state: any) => state.ruleEngineController.submitRuleSet?.branchVOs || []
  );
  const conditionList =
    lodash
      .chain(branchVOs)
      .find((el: any) => el.id === branchId)
      .get('conditions')
      .value() || [];
  useEffect(() => {
    // 这里的逻辑判断可以放到redux
    if (optionType === OptionType.ADD || lodash.isEmpty(conditionList)) {
      dispatch({
        type: 'ruleEngineController/updateNewRuleFlowConditions',
        payload: {
          type: OptionType.ADD,
        },
      });
    } else {
      dispatch({
        type: 'ruleEngineController/updateNewRuleFlowConditions',
        payload: {
          type: OptionType.INIT,
          initList: conditionList,
        },
      });
    }

    return () => {
      dispatch({
        type: 'ruleEngineController/updateNewRuleFlowConditions',
        payload: {
          type: OptionType.CLEAR,
        },
      });
      dispatch({
        type: 'ruleEngineController/updateNewRuleFlowBranchInfo',
        payload: {
          type: OptionType.CLEAR,
        },
      });
    };
  }, []);
  return (
    <div className={styles.branch}>
      <Info branchId={branchId} optionType={optionType} />
      <div className={styles.conditionList}>
        {lodash.map(newConditionList, (item: any, index: number) => {
          return (
            <div key={item.id} className={styles.item}>
              {index > 0 && (
                <div
                  className={styles.reduceWrap}
                  onClick={() => {
                    dispatch({
                      type: 'ruleEngineController/updateNewRuleFlowConditions',
                      payload: {
                        id: item.id,
                        type: OptionType.DELECT,
                      },
                    });
                  }}
                >
                  <Icon type="minus-circle" />
                </div>
              )}

              <Condition item={item} />
              <div
                className={styles.addWrap}
                onClick={() => {
                  dispatch({
                    type: 'ruleEngineController/updateNewRuleFlowConditions',
                    payload: {
                      type: OptionType.ADD,
                    },
                  });
                }}
              >
                <Icon type="plus-circle" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
