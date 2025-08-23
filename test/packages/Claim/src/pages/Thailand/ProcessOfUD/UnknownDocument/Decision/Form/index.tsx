import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Form } from 'antd';

import type { Dispatch } from 'redux';
import { FormItemSelect, formUtils } from 'basic/components/Form';
import FormSection from 'basic/components/Form/FormSection';
import Layout from './Layout';

interface IProps {
  form: any;
  ActivityType: any[];
  Label_DOC_Document: any[];
  dispatch: Dispatch;
  claimProcessData: any;
}

@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
class SearchForm extends Component<IProps> {
  render() {
    const { form, ActivityType, Label_DOC_Document, taskNotEditable } = this.props;
    const decisionRequired = form.getFieldValue('decision') === 'NEW';
    return (
      <FormSection form={form} formId="decision" layout={Layout} isHideBgColor>
        <FormItemSelect
          required
          form={form}
          formName="decision"
          labelId="venus_claim.label.decision"
          dicts={Label_DOC_Document}
          disabled={taskNotEditable}
        />
        <FormItemSelect
          required={decisionRequired}
          form={form}
          formName="activityType"
          dicts={ActivityType}
          disabled={taskNotEditable}
          labelId="venus_claim.label.activityType"
        />
      </FormSection>
    );
  }
}

export default connect(({ UnknownDocumentController, dictionaryController }: any) => ({
  claimProcessData: UnknownDocumentController.claimProcessData,
  Label_DOC_Document: dictionaryController.Label_DOC_Document,
  ActivityType: dictionaryController.ActivityType,
}))(
  Form.create<IProps>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      dispatch({
        type: 'UnknownDocumentController/saveDecision',
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props: IProps) {
      const { claimProcessData } = props;
      return formUtils.mapObjectToFields(claimProcessData, {
        submissionDate: (value: any) => (value ? moment(value) : null),
        submissionChannel: (value: any) => value || null,
        caseCategory: (value: any) => value || null,
      });
    },
  })(SearchForm)
);
