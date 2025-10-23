import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Basic = ({ form, editable }: any) => {
  return (
    <Section
      form={form}
      editable={editable}
      section="ClaimEstimation-Surgical"
      formId="ClaimEstimation-Surgical"
    >
      <Fields.No />
      <Fields.OperationDate />
      <Fields.ProcedureName />
      <Fields.Multiplier />
    </Section>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const {
        dispatch,
        item: { id },
      }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'claimEstimateSurgicalUpdateField',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item, index } = props;

      return formUtils.mapObjectToFields({
        ...item,
        index,
        no: index < 10 ? `0${index + 1}` : index + 1,
      });
    },
  })(Basic)
);
