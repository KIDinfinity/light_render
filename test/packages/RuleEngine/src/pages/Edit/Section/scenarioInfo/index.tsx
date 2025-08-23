import React from 'react';
import { Form, Button } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { messageModal } from '@/utils/commonMessage';
import List from './List';
import { FormKeyEnum } from '../../Enum';
import styles from './index.less';

interface IProps {
  groupId: string;
  groupConditions: any;
  index: number;
  form?: any;
  taskNotEditable?: boolean;
  dispatch: Dispatch<any>;
}

const ScenarioInfo = (props: IProps) => {
  const { form, dispatch, taskNotEditable, groupId, groupConditions, index } = props;

  const handleDeleteGroup = () => {
    messageModal(
      {
        typeCode: 'Label_COM_WarningMessage',
        dictCode: 'WRN_000052',
        args: [index],
      },
      {
        okFn: async () => {
          dispatch({
            type: `ruleEngineController/removeGroup`,
            payload: {
              groupId,
            },
          });
        },
      }
    );
  };

  return (
    <div className={styles.scenarioWrap}>
      <div className={styles.buttonWrap}>
        <Button
          disabled={taskNotEditable}
          onClick={() => {
            handleDeleteGroup();
          }}
        >
          {formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.rules.scenario.label.delete',
          })}
        </Button>
      </div>
      <FormSection
        form={form}
        formId={`${FormKeyEnum.SCENARIOINFO}_${groupId}`}
        title={formatMessageApi({
          Label_BIZ_Claim: 'venus_claim.rules.scenarioConditions.label.title',
        })}
        layConf={{
          default: 24,
          top: 12,
        }}
        isMargin={false}
      >
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          required
          formName="name"
          name="top"
          labelId="venus_claim.rules.scenario.label.title"
        />
        <FormItemInput
          form={form}
          disabled={taskNotEditable}
          formName="description"
          name="top"
          labelId="venus_claim.rules.basicInfo.label.description"
        />
      </FormSection>
      <List list={groupConditions || []} groupId={groupId} />
    </div>
  );
};

export default connect(({ ruleEngineController, claimEditable }: any) => ({
  ruleSetInfo: lodash.get(ruleEngineController, 'submitRuleSet.ruleSetInfo', {}),
  condition: lodash.get(ruleEngineController, 'scenarioInfo.condition', {}),
  inputInfo: lodash.get(ruleEngineController, 'scenarioInfo.inputInfo', {}),
  taskNotEditable: claimEditable.taskNotEditable,
}))(
  Form.create<IProps>({
    onFieldsChange(props, changedFields) {
      const { groupId, dispatch }: any = props;
      if (!formUtils.shouldUpdateState(changedFields)) return;

      dispatch({
        type: `ruleEngineController/saveScenarioInfoFormData`,
        payload: {
          changedFields,
          groupId,
        },
      });
    },

    mapPropsToFields(props) {
      const { name, description }: any = props;

      return formUtils.mapObjectToFields({ name, description }, {});
    },
  })(ScenarioInfo)
);
