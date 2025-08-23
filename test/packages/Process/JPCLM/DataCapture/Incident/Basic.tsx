import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { fieldsHandler } from 'claim/utils';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form, incidentItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const {diagnosisList}=incidentItem;

  const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);

  let layoutName = 'x-layout';
  if (!hasTreatment) {
    layoutName = 'no-treatment-layout';
  } else {
    layoutName = 'no-treatment-invoice-layout';
  }

  return (
    <Section form={form} editable={editable} section="incident.basic" layoutName={layoutName}>
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
  ({ formCommonController, JPCLMOfDataCapture }: any, { incidentId }: any) => ({
    validating: formCommonController.validating,
    klipCaseInfoList:
      JPCLMOfDataCapture?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList,
    insured: JPCLMOfDataCapture.claimProcessData?.insured,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'incidentUpdate',
              payload: {
                changedFields,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'incidentUpdate',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { klipCaseInfoList, insured, incidentId } = props;
      const { policyId } = insured;
      const klipClaimNo = fieldsHandler.getKlipClaimNo(klipCaseInfoList, {
        incidentId,
        policyId,
      });
      return formUtils.mapObjectToFields({ ...props.incidentItem, klipClaimNo });
    },
  })(Basic)
);
