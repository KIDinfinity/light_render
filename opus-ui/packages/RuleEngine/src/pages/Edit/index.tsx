import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import TaskDefKey from 'enum/TaskDefKey';
import BasicInfo from './Section/BasciInfo';
import Scenario from './SectionGroup/Scenario';
import RuleFlow from './Layout/RuleFlow';
import NewRuleFlow from './NewFlow';
import Modals from './Modals';
import { RuleSetType } from './Enum';
import { getNewFlow } from './Utils';
import styles from './index.less';
import { Spin } from 'antd';
import lodash from 'lodash';

interface IProps {
  ruleSetType: string;
  moduleCode: string;
  taskDetail: any;
  isAdvanced: boolean;
  asyncVersionId: string;
}

const RuleEngineMain: React.FC<IProps> = ({
  ruleSetType,
  moduleCode,
  isAdvanced,
  asyncVersionId,
  taskDetail,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const t = async () => {
      const {
        taskStatus,
        taskDefKey,
        submissionChannel,
        procActOrder,
        editFlag,
        isEditPage,
      } = lodash.pick(taskDetail, [
        'taskStatus',
        'taskDefKey',
        'submissionChannel',
        'procActOrder',
        'editFlag',
        'isEditPage',
      ]);
      await dispatch({
        type: 'claimEditable/setTaskNotEditablePermission',
        payload: {
          taskNotEditablePermission: !!(taskDefKey !== TaskDefKey.BP_RUL_ACT001 || isAdvanced),
        },
      });
      await dispatch({
        type: 'claimEditable/set',
        payload: { taskStatus, taskDefKey, submissionChannel, procActOrder, editFlag, isEditPage },
      });
    };
    t();
  }, [isAdvanced, taskDetail]);

  useEffect(() => {
    const t = async () => {
      if (isAdvanced) {
        await dispatch({
          type: 'ruleEngineController/saveAdvanced',
          payload: {
            isAdvanced: true,
          },
        });
        return;
      }

      await dispatch({
        type: 'ruleEngineController/getDropDown',
      });

      await dispatch({
        type: 'ruleEngineController/getClaim',
      });

      await dispatch({
        type: 'dictionaryController/findDictionaryByTypeCodes',
        payload: ['judgementMethod', 'boolean'],
      });
    };

    t();

    return () => {
      dispatch({
        type: `ruleEngineController/cleanClaimdata`,
      });
    };
  }, []);

  useEffect(() => {
    let time: any;
    async function start(asyncVersionId) {
      await dispatch({
        type: 'ruleEngineController/loopAsyncVersionId',
        payload: { asyncVersionId },
      });
    }

    if (asyncVersionId) {
      time = setInterval(() => {
        start(asyncVersionId);
      }, 4000);
    }

    return () => {
      clearTimeout(time);
    };
  }, [asyncVersionId]);

  return (
    <div className={styles.container}>
      {asyncVersionId ? (
        <Spin className={styles.loading} size="large" />
      ) : (
        <>
          <BasicInfo />
          {ruleSetType === RuleSetType.RuleSet && <Scenario />}
          {getNewFlow(moduleCode) && ruleSetType === RuleSetType.RuleFlow && <NewRuleFlow />}
          {!getNewFlow(moduleCode) && ruleSetType === RuleSetType.RuleFlow && <RuleFlow />}
        </>
      )}

      <Modals />
    </div>
  );
};

export default connect(({ ruleEngineController, processTask }: any) => ({
  ruleSetType:
    formUtils.queryValue(ruleEngineController.submitRuleSet.ruleSetInfo?.ruleSetType) || '',
  moduleCode:
    formUtils.queryValue(ruleEngineController.submitRuleSet.ruleSetInfo?.moduleCode) || '',
  taskDetail: processTask.getTask,
  asyncVersionId: ruleEngineController.asyncVersionId,
}))(setClaimEditableHoc(RuleEngineMain));
