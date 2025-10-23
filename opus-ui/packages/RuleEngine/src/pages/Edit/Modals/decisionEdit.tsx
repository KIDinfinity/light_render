import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import DecisionGroup from '../SectionGroup/DecisionGroup';
import SiderOk from '../components/Button/SiderOk';
import styles from './modal.less';

export default () => {
  const { decisionEditData, actionCallBack } = useSelector(
    (state: any) => state.ruleEngineController
  );
  const { onDecisionOk } = actionCallBack;

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
      type: 'ruleEngineController/validateDecisionData',
    });
    if (!errors?.length) {
      dispatch({
        type: 'ruleEngineController/saveModalOptions',
        payload: {
          edit: {
            show: false,
            type: '',
          },
        },
      });
      onDecisionOk(formUtils.cleanValidateData(decisionEditData));
    }
  };

  return (
    <div className={styles.modalRule}>
      <div className={styles.buttonGroup}>
        <SiderOk onOk={handleOk} onCancel={handleCancel} />
      </div>
      <div className={styles.content}>
        <DecisionGroup />
      </div>
    </div>
  );
};
