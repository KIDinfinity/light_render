import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { v4 as uuidv4 } from 'uuid'

const Item = ({ form, incidentId, diagnosisId, diagnosisItem }: any) => {
  const dispatch = useDispatch();

  const claimEntities = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities
  );

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const visiable = editable && (!isRegisterMcs || diagnosisItem?.isManualAdd);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeDiagnosisItem`,
      payload: {
        incidentId,
        diagnosisId,
      },
    });
  };

  return (
    <FormBorderCard marginBottom button={{ visiable, callback: handleDelete }}>
      <Section form={form} editable={editable} section="Diagnosis" formId={'claimRegisterValidation' + uuidv4()}>
        <Fields.CriticalIllness />
        <Fields.CriticalIllnessName />
        <Fields.DiagnosisCode incidentId={incidentId} diagnosisId={diagnosisId} />
        <Fields.DiagnosisDescription />
        <Fields.DiagnosisType incidentId={incidentId} diagnosisId={diagnosisId} />
        <Fields.SymptomDate incidentId={incidentId} claimEntities={claimEntities} />
        <Fields.Ci3 />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { diagnosisId }: any) => ({
    diagnosisItem: modelnamepsace.claimEntities.diagnosisListMap[diagnosisId],
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, diagnosisId, validating }: any = props;
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
