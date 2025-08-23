import React from 'react';
import { NAMESPACE } from '../activity.config';

import { useSelector, connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { BasicFields as Fields } from './Section';

const Basic = ({ form, incidentId, index }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section form={form} editable={editable} section="Incident.Basic" id={incidentId}>
      <Fields.CauseOfIncident />
      <Fields.FirstConsultationDate incidentId={incidentId} />
      <Fields.IdentificationDate />
      <Fields.IncidentDate index={index} incidentId={incidentId} />
      <Fields.IncidentInDetail />
      <Fields.IncidentPlace />
      <Fields.PartOfBodyInjuredArray />
      <Fields.PaymentDateOfMajorCrisis />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { incidentId }: any) => ({
  incidentItem: modelnamepsace.claimEntities.incidentListMap?.[incidentId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId } = props;

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
    mapPropsToFields(props: any) {
      const { incidentItem } = props;

      return formUtils.mapObjectToFields(incidentItem, {
        partOfBodyInjuredArray: (value: any) => (value === null ? [] : value),
      });
    },
  })(Basic)
);
