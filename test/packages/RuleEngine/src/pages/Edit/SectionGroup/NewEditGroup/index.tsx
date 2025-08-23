import React from 'react';
import { Form, Button } from 'antd';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { formUtils } from 'basic/components/Form';
import { connect, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import FormSection, { FormItemInput } from 'basic/components/Form/FormSection';
import AdvanceMode from '../../components/AdvanceMode';
import Info from './info';
import Main from './main';

import styles from './index.less';

interface IProps {
  form: any;
  dispatch: Dispatch;
  editData: object;
  taskNotEditable: boolean;
  ruleSetId?: string;
  moduleCode: string;
}
interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  validating: boolean;
}

const NewEditGroup = ({ ruleSetId, form, taskNotEditable, editData }: IProps) => {
  const dispatch = useDispatch();
  const { editMode } = editData;

  const switchMode = () => {
    dispatch({
      type: 'ruleEngineController/updateEditData',
      payload: {
        changedFields: {
          conditions: [],
          results: [],
          ruleContent: '',
          editMode: editMode === 1 ? 0 : 1,
        },
      },
    });
  };

  return (
    <FormSection
      form={form}
      formId="FormData"
      layConf={{
        default: 24,
        basicRuleId: 6,
      }}
      isMargin={false}
    >
      {ruleSetId && !lodash.isEmpty(ruleSetId) && (
        <FormItemInput
          form={form}
          formName="basicRuleId"
          name="basicRuleId"
          labelId="venus_claim.ruleEngine.label.ruleId"
          disabled
        />
      )}

      <div className={styles.section}>
        <Button className={styles.button} onClick={switchMode}>
          {editMode !== 1 ? 'Use Advance' : 'Use Default'}
        </Button>
        <Info form={form} taskNotEditable={taskNotEditable} />
      </div>
      {editMode !== 1 ? <Main /> : <AdvanceMode taskNotEditable={taskNotEditable} />}
    </FormSection>
  );
};

export default connect(({ claimEditable, ruleEngineController }: any) => ({
  ruleSetId: ruleEngineController.ruleSetInfo?.ruleSetId || '',
  editData: ruleEngineController.editData,
  moduleCode:
    formUtils.queryValue(ruleEngineController.submitRuleSet.ruleSetInfo?.moduleCode) || '',
  taskNotEditable: claimEditable.taskNotEditable,
}))(
  Form.create<IFormProps>({
    async onFieldsChange(props, changedFields) {
      if (formUtils.shouldUpdateState(changedFields)) {
        const { dispatch } = props;
        dispatch({
          type: 'ruleEngineController/updateEditData',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { editData }: any = props;
      return formUtils.mapObjectToFields(editData, {});
    },
  })(NewEditGroup)
);
