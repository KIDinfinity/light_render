import React from 'react';

import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Diagnosis, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Diagnosis';

interface IProps {
  form: any;
  NAMESPACE: string;
  isCINameRequired: boolean;
  incidentId: string;
  diagnosisId: string;
  diagnosisItem: any;
  editable: boolean;
}
const Item = ({ form, NAMESPACE, incidentId, editable, diagnosisId }: IProps) => {
  return (
    <Diagnosis.Section form={form} editable={editable} section="Diagnosis" NAMESPACE={NAMESPACE} id={diagnosisId}>
      <Fields.CriticalIllness />
      <Fields.CriticalIllnessName />
      <Fields.DiagnosisCode incidentId={incidentId} />
      <Fields.DiagnosisDescription />
      <Fields.DiagnosisType />
      <Fields.SymptomDate incidentId={incidentId} />
      <Fields.Ci3 />
    </Diagnosis.Section>
  );
};

export default connect((state: any, { NAMESPACE, diagnosisId }: any) => ({
  validating: state?.formCommonController.validating,
  diagnosisItem: state?.[NAMESPACE]?.claimEntities?.diagnosisListMap?.[diagnosisId],
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { NAMESPACE, dispatch, incidentId, diagnosisId, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveDiagnosisItem',
              payload: {
                changedFields,
                incidentId,
                diagnosisId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveDiagnosisItem',
            payload: {
              changedFields,
              incidentId,
              diagnosisId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { diagnosisItem } = props;

      return formUtils.mapObjectToFields(diagnosisItem);
    },
  })(Item)
);
