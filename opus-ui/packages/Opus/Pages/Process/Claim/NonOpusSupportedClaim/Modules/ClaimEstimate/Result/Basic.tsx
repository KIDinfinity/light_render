import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Basic = ({ form, editable }: any) => {
  return (
    <>
      <Section
        form={form}
        editable={editable}
        section="ClaimEstimation-Result-Basic"
        formId="ClaimEstimation-Result-Basic"
      >
        <Fields.PolicyNo />

        <Fields.SourceSystem />
      </Section>
      <Section form={form} editable={editable} section="ClaimEstimation-Result-Basic">
        <Fields.ProductCode />
      </Section>
    </>
  );
};

export default connect()(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'claimEstimateResultUpdate',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields({
        ...item,
        sourceSystem: formatMessageApi({ Label_CLM_Opus: item?.sourceSystem }),
      });
    },
  })(Basic)
);
