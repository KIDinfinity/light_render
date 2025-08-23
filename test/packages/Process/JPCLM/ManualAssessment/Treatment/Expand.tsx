import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { ClaimType } from 'claim/enum';
import EIsAdjustment from 'process/JPCLM/ManualAssessment/_models/enum/isAdjustment';
import Section, { BasicExpandFields as Fields } from './Section';

const TreatmentListItemOfBasicInfoExpand = ({ form, incidentId, treatmentId }: any) => {
  const treatmentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId]
  );
  const editable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) &&
    treatmentItem?.isAdjustment !== EIsAdjustment.Y;

  const treatmentType = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId]?.treatmentType
  );
  const isTreatmentTypeIP = formUtils.queryValue(treatmentType) === ClaimType.IPD;
  const layoutName = 'no-invoice-layout';
  return (
    <Section
      form={form}
      editable={editable}
      section="Treatment.Basic.Expand"
      layoutName={layoutName}
    >
      <Fields.DateOfAdmission incidentId={incidentId} isTreatmentTypeIP={isTreatmentTypeIP} />
      <Fields.DateOfDischarge isTreatmentTypeIP={isTreatmentTypeIP} />
      <Fields.Department />
      <Fields.Doctor />
      <Fields.Icu isTreatmentTypeIP={isTreatmentTypeIP} />
      <Fields.IcuFromDate isTreatmentTypeIP={isTreatmentTypeIP} />
      <Fields.IcuToDate isTreatmentTypeIP={isTreatmentTypeIP} />
      <Fields.IsDischarged isTreatmentTypeIP={isTreatmentTypeIP} />
      <Fields.MedicalProvider isTreatmentTypeIP={isTreatmentTypeIP} treatmentId={treatmentId} />
      <Fields.MedicalProviderDescription />
    </Section>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { treatmentId }: any) => ({
    treatmentItem: JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId, treatmentId, validating } = props;
      const temChangedFields = { ...changedFields };
      if (lodash.has(changedFields, 'icu') && lodash.size(changedFields) === 1) {
        temChangedFields.icu = changedFields.icu.value ? 1 : 0;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveTreatmentItem',
              payload: {
                changedFields: temChangedFields,
                incidentId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveTreatmentItem',
            payload: {
              changedFields: temChangedFields,
              incidentId,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;

      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(TreatmentListItemOfBasicInfoExpand)
);
