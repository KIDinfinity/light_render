import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection from 'basic/components/Form/FormSection';
import Header from '../../Section/Decision/Header';
import Branch from '../../Section/Decision/Branch';
import FooterBtn from './FooterBtn';
import { Action } from '../../Enum';

interface IProps {
  form: any;
  dispatch: Dispatch;
  decisionEditData: object;
  taskNotEditable: boolean;
}

class DecisionGroup extends Component<IProps> {
  get isNotEditable() {
    const { taskNotEditable, decisionEditData } = this.props;

    return taskNotEditable || decisionEditData.action === Action.View;
  }

  render() {
    const { form } = this.props;

    return (
      <FormSection form={form} formId="FormDecisionData_flowNodeVO" layConf={24} isMargin={false}>
        <Header form={form} taskNotEditable={this.isNotEditable} />
        <Branch taskNotEditable={this.isNotEditable} />
        <FooterBtn />
      </FormSection>
    );
  }
}

export default connect(({ claimEditable, ruleEngineController, formCommonController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  flowNodeVO: ruleEngineController.decisionEditData?.flowNodeVO || {},
  decisionEditData: ruleEngineController.decisionEditData || {},
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: 'ruleEngineController/updateDecisionEditFlowNodeData',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { flowNodeVO } = props;
      return formUtils.mapObjectToFields(flowNodeVO);
    },
  })(DecisionGroup)
);
