import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/PostponeDeclineRemark-Field/index.tsx';

const DPRemarkSection = ({ form, coverageId, editableOfSustainability }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable && editableOfSustainability}
      section="PostponeDeclineRemark-Field"
    >
      <Fields.ReasonCode coverageId={coverageId} labelType="inline" />
      <Fields.ShortDescription coverageId={coverageId} labelType="inline" />
      <Fields.LongDescription labelType="inline" />
      <Fields.Uwdecisionreason labelType="inline" />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, id, coverageId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveCoverageRemarkList',
          payload: {
            id,
            changedFields,
            coverageId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { DPRemarkField } = props;
      return formUtils.mapObjectToFields(DPRemarkField);
    },
  })(DPRemarkSection)
);
