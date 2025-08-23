import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import Section, { Fields } from './Section';

const DPRemarkSection = ({ form, coverageId, editableOfSustainability }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      editable={editable && editableOfSustainability}
      section="PostponeDeclineRemark-Field"
    >
      <Fields.ReasonCode coverageId={coverageId} />
      <Fields.ShortDescription coverageId={coverageId} />
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
      const { dispatch, validating, id, coverageId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveCoverageRemarkList',
              payload: {
                id,
                changedFields,
                coverageId,
              },
            });
          }, 0);
        } else {
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
      }
    },
    mapPropsToFields(props: any) {
      const { DPRemarkField } = props;
      return formUtils.mapObjectToFields(DPRemarkField);
    },
  })(DPRemarkSection)
);
