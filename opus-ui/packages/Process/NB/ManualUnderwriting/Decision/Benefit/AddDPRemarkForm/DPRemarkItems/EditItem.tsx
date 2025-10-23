import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, { DPRemarkFields as Fields } from './Section';

const EditItemSection = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      section="PostponeDeclineRemark-Field"
      layoutName="modal-layout"
    >
      <Fields.ReasonCode />
      <Fields.ShortDescription />
      <Fields.LongDescription />
      <Fields.Uwdecisionreason />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveDPRemarkItem',
              payload: {
                id,
                changedFields,
              },
            });
          }, 0);
        } else {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'saveDPRemarkItem',
              payload: {
                id,
                changedFields,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(EditItemSection)
);
