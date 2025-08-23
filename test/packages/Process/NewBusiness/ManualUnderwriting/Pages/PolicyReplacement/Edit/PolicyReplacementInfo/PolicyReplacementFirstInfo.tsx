import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section from 'process/NewBusiness/ManualUnderwriting/_components/EditableSection';

import { Fields } from './Fields';

import { localConfig } from '../../_config/PolicyReplacementField';

const PolicyReplacementField = ({ form }: any) => {
  return (
    <Section section="PolicyReplacement-Field" form={form} localConfig={localConfig}>
      <Fields.Paidbypolicyloan />
      <Fields.Replaceinforce />
      <Fields.InforcePolicy />
      <Fields.ReinstatablePolicy />
      <Fields.ReplaceWithApplyFor />
    </Section>
  );
};
export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: `setPolicyReplFirstInfo`,
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(PolicyReplacementField)
);
