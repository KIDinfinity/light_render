import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import RuleGroup from '../SectionGroup/RuleGroup';
import { Action } from '../Enum';
import SiderOk from '../components/Button/SiderOk';
import styles from './modal.less';

export default () => {
  const { action, currentGroupId, editData } = useSelector(
    (state: any) => state.ruleEngineController
  );

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch({
      type: 'ruleEngineController/saveModalOptions',
      payload: {
        edit: {
          show: false,
          type: '',
        },
      },
    });
    dispatch({
      type: 'ruleEngineController/saveState',
      payload: {
        currentGroupId: null,
        action: null,
      },
    });
  };

  const handleOk = async () => {
    const errors = await dispatch({
      type: 'ruleEngineController/validateEditData',
    });
    if (!errors?.length) {
      if (editData.editMode === 1) {
        const result = await dispatch({
          type: 'ruleEngineController/validateRuleContent',
          payload: { ruleContent: editData.ruleContent },
        });
        if (!result) {
          return;
        }
      }
      dispatch({
        type: `ruleEngineController/${action === Action.Update ? 'updateRules' : 'addRules'}`,
        payload: {
          groupId: currentGroupId,
          editData: formUtils.cleanValidateData(editData),
        },
      });

      dispatch({
        type: 'ruleEngineController/saveModalOptions',
        payload: {
          edit: {
            show: false,
            type: '',
          },
        },
      });

      dispatch({
        type: 'ruleEngineController/saveState',
        payload: {
          currentGroupId: null,
          action: null,
        },
      });
    }
  };

  return (
    <div className={styles.modalRule}>
      <div className={styles.buttonGroup}>
        <SiderOk onOk={handleOk} onCancel={handleCancel} />
      </div>
      <div className={styles.content}>
        <RuleGroup />
      </div>
    </div>
  );
};
