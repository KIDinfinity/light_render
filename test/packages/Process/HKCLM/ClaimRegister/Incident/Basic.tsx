import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from '../../DataCapture/Incident/Section';
import TreatmentSection, { BasicFields as TreatmentFields } from '../../DataCapture/Treatment/Section';

const Basic = ({ form, incidentId, index }: any) => {
  return (
    <>
      <Section form={form} editable={false} section="Incident.Basic" id={incidentId}>
        <Fields.CauseOfIncident skipAutoChangeField={true} />
        <Fields.IncidentDate index={index} incidentId={incidentId} />
      </Section>
      <TreatmentSection form={form} editable={false} section="Treatment.Basic">
        <TreatmentFields.DateOfAdmission />
        <TreatmentFields.DateOfDischarge />
      </TreatmentSection>
    </>

  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
    validating: formCommonController.validating,
    incidentItem: modelnamepsace.claimEntities.incidentListMap?.[incidentId],
    treatmentListMap: modelnamepsace.claimEntities?.treatmentListMap,
  })
)(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { incidentItem, treatmentListMap } = props;

      if (incidentItem?.treatmentList?.length) {
        const treatment = treatmentListMap?.[incidentItem?.treatmentList[0]];
        return formUtils.mapObjectToFields({
          ...treatment,
          ...incidentItem
        });
      }
      return formUtils.mapObjectToFields(incidentItem);
    },
  })(Basic)
);
