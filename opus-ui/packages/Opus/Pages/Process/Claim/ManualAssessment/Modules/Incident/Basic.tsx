import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form, incidentId, hasTreatment, dateTimeOfDeath }: any) => {
  const incidentItem = useSelector(
    ({ opusClaimAssessment }: any) => opusClaimAssessment.claimEntities.incidentListMap[incidentId]
  );
  const { diagnosisList } = incidentItem;
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="Incident.Basic">
      <Fields.ClaimTypeArray />
      <Fields.CauseOfIncident diagnosisList={diagnosisList} />
      <Fields.FirstConsultationDate />
      <Fields.IncidentDate />
      <Fields.ClaimReferenceDate />
      <Fields.TrafficAccidentFlag />
      <Fields.ReportToThePolice />
      <Fields.BehaviorInAccident />
      <Fields.IsDrinking />
      <Fields.IncidentPlace />
      <Fields.PartOfBodyInjuredArray />
      <Fields.IncidentInDetail />
      <Fields.CancerAppearanceDiagnosisDate />
    </Section>
  );
};

export default connect(
  ({ formCommonController, opusClaimAssessment }: any, { incidentId }: any) => ({
    incidentItem: opusClaimAssessment.claimEntities.incidentListMap?.[incidentId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, incidentId }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveIncidentItem',
          payload: {
            changedFields,
            incidentId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { incidentItem }: any = props;

      return formUtils.mapObjectToFields(incidentItem);
    },
  })(Basic)
);
