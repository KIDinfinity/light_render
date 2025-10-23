import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import Section, { Fields } from './Section';

const Basic = ({ form, editable }: any) => {
  return (
    <Section
      form={form}
      editable={editable}
      section="ClaimEstimation-Treatment"
      formId="ClaimEstimation-Treatment"
    >
      <Fields.No />
      <Fields.DateOfAdmission />
      <Fields.DateOfDischarge />
      {/* <Fields.MedicalProvider /> */}
      <Fields.InpatientDays />
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
          target: 'claimEstimateTreatmentUpdate',
          payload: {
            changedFields,
            id,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item, index } = props;
      const { inpatientDays, dateOfAdmission, dateOfDischarge } = item;

      return formUtils.mapObjectToFields({
        ...item,
        index,
        // 兼容后端没有返回的情况
        inpatientDays:
          inpatientDays ||
          (!!dateOfAdmission && !!dateOfDischarge
            ? moment(formUtils.queryValue(dateOfDischarge)).diff(
                moment(formUtils.queryValue(dateOfAdmission)),
                'days'
              )
            : null),
        no: index < 10 ? `0${index + 1}` : index + 1,
      });
    },
  })(Basic)
);
