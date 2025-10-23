import React from 'react';
import { Checkbox } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import DeleteButton from 'claim/components/DeleteButton';
import SectionBorder from '../../../components/SectionBorder';
import Link from '../../../components/Button/Link';
import Header from './Header';
import styles from './index.less';
import Table from './Table';

export default () => {
  const dispatch = useDispatch();

  const branchList = useSelector(
    (state: any) => state.ruleEngineController.decisionEditData?.branchVO?.branchList || []
  );
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);

  const handleCheckClick = ({ id, checked }: any) => {
    dispatch({
      type: 'ruleEngineController/updateDecisionBranchEditData',
      payload: {
        id,
        changedFields: {
          checked: !checked,
        },
      },
    });
  };

  const handleDelete = ({ id }: any) => {
    dispatch({
      type: 'ruleEngineController/removeDecisionBranch',
      payload: {
        id,
      },
    });
  };

  const onUnBind = ({ id }: any) => {
    dispatch({
      type: 'ruleEngineController/saveBanchUnBind',
      payload: {
        id,
      },
    });
  };

  return (
    <>
      {lodash.isArray(branchList) &&
        lodash.map(branchList, (item: any, index: number) => (
          <SectionBorder title={`B${Number(index + 1)}`} key={item.id}>
            <div className={styles.branchWrap}>
              {lodash.isArray(branchList) && branchList.length > 1 && (
                <div className={styles.buttonWrap}>
                  <DeleteButton handleClick={() => handleDelete(item)} />
                </div>
              )}
              <div className={styles.left}>
                {item.binded === '1' ? (
                  <Link
                    onUnBind={() => {
                      onUnBind(item);
                    }}
                    taskNotEditable={taskNotEditable}
                  />
                ) : (
                  <Checkbox
                    name="checked"
                    checked={item.checked}
                    disabled={taskNotEditable}
                    onChange={() => handleCheckClick(item)}
                  />
                )}
              </div>
              <div className={styles.right}>
                <Header
                  branchItem={item}
                  taskNotEditable={item.binded === '1' || taskNotEditable}
                />
                {lodash.isArray(item?.conditions) && (
                  <Table
                    taskNotEditable={item.binded === '1' || taskNotEditable}
                    item={item}
                    list={item.conditions}
                  />
                )}
              </div>
            </div>
          </SectionBorder>
        ))}
    </>
  );
};
