import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Exclusion-Field';

const ExclusionSection = ({ form, id }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable}
      section="Exclusion-Field"
      layoutName="modal-layout"
      formId={`addExclusion-Field-${id}`}
    >
      <Fields.Code />
      <Fields.ShortName />
      <Fields.LongDescription />
      <Fields.Reason />
      <Fields.ExclusionReason />
      <Fields.Exclusionuwdecisionreason />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePopExclusion',
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
  })(ExclusionSection)
);
