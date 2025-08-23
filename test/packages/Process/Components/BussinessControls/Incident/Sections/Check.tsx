import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Incident, {
  SectionTitle,
  FieldsCheck as Fields,
} from 'process/Components/BussinessControls/Incident';

interface IProps {
  NAMESPACE: string;
  incidentId: string;
  editable: boolean;
  form: any;
}

const SectionBasic = ({ form, editable, NAMESPACE, incidentId }: IProps) => {
  return (
    <Incident.Section
      form={form}
      editable={editable}
      section="Incident"
      NAMESPACE={NAMESPACE}
      id={incidentId}
    >
      <Fields.SpecialEndorsement />
      <Fields.RelatedToAlcohol />
      <Fields.RelatedToAssaultHit />
      <Fields.TrafficAccident />
      <Fields.CongenitalIllness />
      <Fields.SecondaryCoverage />
    </Incident.Section>
  );
};

export { SectionTitle };
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

      return formUtils.mapObjectToFields(incidentItem);
    },
  })(SectionBasic)
);
