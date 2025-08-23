import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form, incidentId, hasTreatment, dateTimeOfDeath }: any) => {
  const incidentItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.incidentListMap[incidentId]
  );
  const {diagnosisList}=incidentItem;
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentListMap = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.claimEntities?.treatmentListMap
  );

  let layoutName = 'no-treatment-layout';

  if (hasTreatment) {
    layoutName = 'no-invoice-layout';
  }

  return (
    <Section form={form} editable={editable} section="Incident.Basic" layoutName={layoutName}>
      <Fields.ClaimTypeArray />
      <Fields.CauseOfIncident diagnosisList={diagnosisList}/>
      <Fields.IncidentDate />
      <Fields.FirstConsultationDate />
      <Fields.EditDate />
      <Fields.ClaimReferenceDate />
      <Fields.RequiringNursingDate />
      <Fields.StateOfRequiringNursing />
      <Fields.DisabilityGrade />
      <Fields.TotalPermanentDisability />
      <Fields.PhysicalDisability />
      <Fields.MentalState />
      <Fields.DeathCode />
      <Fields.CauseOfDeath />
      <Fields.CancerAppearanceDiagnosisDate />
      <Fields.IdentificationDate />
      {/* 以下field 为 expand: 'N' */}
      <Fields.IncidentPlace />
      <Fields.LaborConstrainedOfAmi />
      <Fields.PartOfBodyInjuredArray />
      <Fields.MedicalCertificateDate />
      <Fields.ReportToThePolice />
      <Fields.SequelaeOfStroke />
      <Fields.TrafficAccidentFlag />
      <Fields.BehaviorInAccident />
      <Fields.IsDrinking />
      <Fields.JudgmentAbility />
      <Fields.IncidentInDetail />
    </Section>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { incidentId }: any) => ({
    incidentItem: JPCLMOfClaimAssessment.claimEntities.incidentListMap?.[incidentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveIncidentItem',
              payload: {
                changedFields,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { incidentItem }: any = props;

      return formUtils.mapObjectToFields(incidentItem, {
        partOfBodyInjuredArray: (value: any) => (value === null ? [] : value),
      });
    },
  })(Basic)
);
