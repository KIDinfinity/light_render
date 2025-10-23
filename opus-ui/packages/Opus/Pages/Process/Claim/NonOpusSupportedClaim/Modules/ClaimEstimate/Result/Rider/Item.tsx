import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Basic = ({ form, editable }: any) => {
  return (
    <Section form={form} editable={false} section="ClaimEstimation-Result-Rider">
      <Fields.No />
      <Fields.ProcedureCode />
      <Fields.SumAssured />
      <Fields.ProposedClaimDecision />
      <Fields.HospitalBenefit />
      <Fields.SurgeryBenefit />
      <Fields.AssessmentRemark />
      <Fields.CoverageEffectiveDate />
      <Fields.CoverageStatus />
      <Fields.PremiumPaymentStatus />
      <Fields.ClaimReviewPoints />
    </Section>
  );
};

export default connect()(
  Form.create({
    mapPropsToFields(props: any) {
      const { item } = props;

      return formUtils.mapObjectToFields(item);
    },
  })(Basic)
);
