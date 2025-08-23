import React, { Component } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';

import type { Dispatch } from 'redux';
import { FormItemSelect, formUtils } from 'basic/components/Form';
import FormSection from 'basic/components/Form/FormSection';
import Layout from './Layout';

interface IProps {
  form: any;
  categoryList: any[];
  dispatch: Dispatch;
  claimProcessData: any;
}

class CaseInformation extends Component<IProps> {
  render() {
    const { form, categoryList } = this.props;
    return (
      <FormSection
        form={form}
        formId="CaseInformation"
        title="venus_claim.label.caseInformation"
        layout={Layout}
      >
        <FormItemSelect
          required
          disabled
          form={form}
          formName="caseCategory"
          labelId="venus_claim.label.caseCategory"
          dicts={categoryList}
        />
      </FormSection>
    );
  }
}

export default connect(({ dictionaryController, UDOfCreateController }: any) => ({
  claimProcessData: UDOfCreateController.claimProcessData,
  categoryList: dictionaryController.Label_BPM_CaseCategory,
}))(
  Form.create<IProps>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      dispatch({
        type: 'UDOfCreateController/saveCaseInfo',
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props: IProps) {
      const { claimProcessData } = props;
      return formUtils.mapObjectToFields(claimProcessData.processParam, {
        caseCategory: (value: any) => value || null,
      });
    },
  })(CaseInformation)
);
