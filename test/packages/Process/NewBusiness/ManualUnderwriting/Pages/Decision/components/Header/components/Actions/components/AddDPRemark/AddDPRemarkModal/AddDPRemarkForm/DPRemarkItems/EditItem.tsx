import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/PostponeDeclineRemark-Field/index.tsx';

const EditItemSection = ({ form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      section="PostponeDeclineRemark-Field"
      formId={`addDPRemark-Field-${id}`}
      layoutName="modal-layout"
    >
      <Fields.ReasonCode />
      <Fields.ShortDescription />
      <Fields.LongDescription />
      <Fields.Uwdecisionreason />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveDPRemarkItem',
          payload: {
            id,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(EditItemSection)
);
