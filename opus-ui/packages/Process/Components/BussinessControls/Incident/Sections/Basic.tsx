import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';

import Incident, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Incident';

interface IProps {
  NAMESPACE: string;
  namespaceType: string;
  incidentId: string;
  editable: boolean;
  form: any;
}

const SectionBasic = ({ form, NAMESPACE, namespaceType, incidentId, editable }: IProps) => {
  return (
    <Incident.Section
      form={form}
      editable={editable}
      section="Incident"
      NAMESPACE={NAMESPACE}
      namespaceType={namespaceType}
      id={incidentId}
    >
      <Fields.CauseOfIncident />
      <Fields.FirstConsultationDate incidentId={incidentId} />
      <Fields.IdentificationDate />
      <Fields.IncidentTime />
      <Fields.IncidentDate incidentId={incidentId} />
      <Fields.IncidentInDetail />
      <Fields.IncidentPlace />
      <Fields.PartOfBodyInjuredArray />
      <Fields.TimeofIncident />
    </Incident.Section>
  );
};

export default connect((state: any, { NAMESPACE, incidentId }: any) => ({
  validating: state?.formCommonController.validating,
  incidentItem: state?.[NAMESPACE]?.claimEntities?.incidentListMap?.[incidentId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, NAMESPACE, incidentId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveIncidentItem',
              payload: {
                changedFields,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveIncidentItem',
            payload: {
              changedFields,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { incidentItem } = props;
      return formUtils.mapObjectToFields(incidentItem, {
        partOfBodyInjuredArray: (value: any) => (value === null ? [] : value),
      });
    },
  })(SectionBasic)
);
