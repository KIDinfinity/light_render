import React, { useEffect } from 'react';
import { Button, Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import Condition from './Condition';
import { Type } from '../../Enum';
import styles from './List.less';

interface IProps {
  list: [];
  groupId: string;
}

const ConditionList = ({ list, groupId }: IProps) => {
  const dispatch = useDispatch();

  const { isAdvanced, taskNotEditable } = useSelector((state: any) => {
    return {
      isAdvanced: lodash.get(state.ruleEngineController, 'isAdvanced'),
      taskNotEditable: lodash.get(state.claimEditable, 'taskNotEditable'),
    };
  });

  useEffect(() => {
    return () => {};
  }, []);

  const handleReduce = (conditionItem: any) => {
    if (taskNotEditable) return;

    dispatch({
      type: `ruleEngineController/reduceGroupConditions`,
      payload: {
        groupId,
        item: conditionItem,
      },
    });
  };
  const handleAdd = (index: number) => {
    if (taskNotEditable) return;

    dispatch({
      type: `ruleEngineController/addGroupConditions`,
      payload: {
        groupId,
        index,
      },
    });
  };

  return (
    <div className={styles.conditionList}>
      <div className={styles.groupTitle}>Scenario Conditions：</div>
      {(list.length === 0 || !list) && (
        <div className={styles.buttonWrap}>
          <Button
            disabled={taskNotEditable}
            onClick={() => {
              handleAdd(0);
            }}
          >
            Add Conditions
          </Button>
        </div>
      )}

      {lodash.map(list, (item: any, index): any => (
        <div className={styles.conditionItemWrap} key={item?.atomCode || `key_${index}`}>
          {!isAdvanced && (
            <div
              className={styles.reduceWrap}
              onClick={() => {
                handleReduce(item);
              }}
            >
              <Icon type="minus-circle" />
            </div>
          )}

          <div className={styles.conditionItem}>
            <Condition item={item} groupId={groupId} type={Type.Scenario} />
          </div>
          {!isAdvanced && (
            <div
              className={styles.addWrap}
              onClick={() => {
                handleAdd(index);
              }}
            >
              <Icon type="plus-circle" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConditionList;
