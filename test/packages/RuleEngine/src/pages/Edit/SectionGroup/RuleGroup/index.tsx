import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormSection from 'basic/components/Form/FormSection';
import Header from './Header';
import Conditions from './Conditions';
import Result from './Result';
import { JudgementMethod } from '../../Enum';
import AdvanceMode from '../../components/AdvanceMode';
import styles from './index.less';

interface IProps {
  form: any;
  dispatch: Dispatch;
  editData: object;
  taskNotEditable: boolean;
}

class RuleGroup extends Component<IProps> {
  render() {
    const { form, taskNotEditable, editData, dispatch } = this.props;
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
      <FormSection form={form} formId="FormData" layConf={24} isMargin={false}>
        <div className={styles.section}>
          <Button className={styles.button} onClick={switchMode}>
            {editMode !== 1 ? 'Use Advance' : 'Use Default'}
          </Button>
          <Header form={form} taskNotEditable={taskNotEditable} editMode={editMode} />
        </div>
        {editMode !== 1 ? (
          <>
            <Conditions form={form} taskNotEditable={taskNotEditable} />
            <Result form={form} taskNotEditable={taskNotEditable} />
          </>
        ) : (
          <AdvanceMode taskNotEditable={taskNotEditable} />
        )}
      </FormSection>
    );
  }
}

export default connect(({ claimEditable, ruleEngineController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  editData: ruleEngineController.editData,
}))(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      if (formUtils.shouldUpdateState(changedFields)) {
        const { dispatch } = props;
        const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, []);
        const judgementMethod = lodash.get(finalChangedFields, 'judgementMethod');
        if (judgementMethod && judgementMethod === JudgementMethod['04']) {
          return;
        }
        dispatch({
          type: 'ruleEngineController/updateEditData',
          payload: {
            changedFields: finalChangedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { editData } = props;
      return formUtils.mapObjectToFields(editData, {});
    },
  })(RuleGroup)
);
