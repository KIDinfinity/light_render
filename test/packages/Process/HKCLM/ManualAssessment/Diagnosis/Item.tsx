import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from './Section';

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
      <Section form={form} editable={editable} section="Diagnosis">
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
  ({ [NAMESPACE]: modelnamepsace }: any, { diagnosisId }: any) => ({
    diagnosisItem: modelnamepsace.claimEntities.diagnosisListMap[diagnosisId],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, diagnosisId }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
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
    },
    mapPropsToFields(props: any) {
      const { diagnosisItem } = props;

      return formUtils.mapObjectToFields(diagnosisItem);
    },
  })(Item)
);
