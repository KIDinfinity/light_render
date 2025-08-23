import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';

import lodash from 'lodash';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import {
  removeProcedureItem,
  addTherapiesItem,
} from 'process/THCLM/ManualAssessment/_models/functions';
import Section, { Fields } from './Section';

const ProcedureItem = ({ form, incidentId, treatmentId, procedureId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const handleDelete = () => {
    removeProcedureItem(dispatch, treatmentId, procedureId);
  };
  return (
    <FormBorderCard marginBottom button={{ visiable: editable, callback: handleDelete }}>
      <Section form={form} editable={editable} section="Procedure">
        <Fields.TherapiesType treatmentId={treatmentId} />
        <Fields.ProcedureCode procedureId={procedureId} />
        <Fields.OperationDate treatmentId={treatmentId} incidentId={incidentId} />
        <Fields.ProcedureDescription />
        <Fields.ReimbursementPercentage treatmentId={treatmentId} procedureId={procedureId} />
        <Fields.SurgeryCategory />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { procedureId }: any) => ({
    procedureItem: modelnamepsace.claimEntities.procedureListMap[procedureId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { dispatch, procedureId, treatmentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveProcedureItem',
              payload: {
                changedFields,
                treatmentId,
                procedureId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveProcedureItem',
            payload: {
              changedFields,
              treatmentId,
              procedureId,
            },
          });
        }
        if (
          !!formUtils.queryValue(therapiesType) &&
          formUtils.queryValue(therapiesType) !== TherapiesTypeEnum.Surgery
        ) {
          removeProcedureItem(dispatch, treatmentId, procedureId);
          addTherapiesItem(dispatch, changedFields, treatmentId);
        }
      }
    },
    mapPropsToFields(props: any) {
      const { procedureItem } = props;
      const therapiesType = lodash.has(procedureItem, 'therapiesType')
        ? procedureItem.therapiesType
        : 'Surgery';
      return formUtils.mapObjectToFields({ ...procedureItem, therapiesType });
    },
  })(ProcedureItem)
);
