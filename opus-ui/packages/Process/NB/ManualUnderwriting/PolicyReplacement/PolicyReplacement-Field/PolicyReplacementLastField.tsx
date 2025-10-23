import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';

const PolicyReplacementField = ({ form }: any) => {

  return (
    <Section
      section="PolicyReplacement-Field"
      form={form}
      localConfig={localConfig}
    >
      <Fields.Comment />
      <Fields.Partyinfluence />
      <Fields.Satisfiedexplanation />
      <Fields.Extensiontoexistingproduct />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'setPolicyReplacementField',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'setPolicyReplacementField',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(PolicyReplacementField)
);
