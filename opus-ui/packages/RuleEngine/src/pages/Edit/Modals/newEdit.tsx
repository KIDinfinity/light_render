import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import SiderOk from '../components/Button/SiderOk';
import NewEditGroup from '../SectionGroup/NewEditGroup';
import { Action } from '../Enum';
import getNewModalError from '../Utils/getNewModalError';
import styles from './modal.less';

export default () => {
  const action = useSelector((state: any) => state.ruleEngineController.action);
  const currentGroupId = useSelector((state: any) => state.ruleEngineController.currentGroupId);
  const editData = useSelector((state: any) => state.ruleEngineController.editData);

  const loadingValidate = useSelector(
    ({ loading }) => loading.effects['ruleEngineController/validateRuleContent']
  );

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch({
      type: 'ruleEngineController/saveState',
      payload: {
        currentGroupId: null,
        action: null,
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
  };

  const handleOk = async () => {
    if (editData.editMode === 1) {
      const result = await dispatch({
        type: 'ruleEngineController/validateRuleContent',
        payload: { ruleContent: editData.ruleContent },
      });
      if (!result) {
        return;
      }
    }

    const errors = await dispatch({
      type: 'ruleEngineController/validateEditData',
    });
    const newEditData = formUtils.cleanValidateData(editData);
    const newModalError = getNewModalError(newEditData.conditions, newEditData.results);

    // TODO:z这里应该筛选出需要提交的字段
    if (!lodash.isEmpty(newModalError)) {
      await dispatch({
        type: `ruleEngineController/updateNewModalError`,
        payload: {
          newModalError,
        },
      });
      return;
    }

    if (!errors?.length) {
      dispatch({
        type: `ruleEngineController/${action === Action.Update ? 'updateRules' : 'addRules'}`,
        payload: {
          groupId: currentGroupId,
          editData: newEditData,
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
        <SiderOk onOk={handleOk} onCancel={handleCancel} loading={loadingValidate} />
      </div>
      <div className={styles.content}>
        <NewEditGroup />
      </div>
    </div>
  );
};
