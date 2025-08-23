import React from 'react';

import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';

import lodash from 'lodash';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import Procedure, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Procedure';

const ProcedureListItem = ({
  form,
  editable,
  NAMESPACE,
  procedureId,
  treatmentId,
  incidentId,
}: any) => {
  return (
    <Procedure.Section
      form={form}
      editable={editable}
      section="Procedure"
      NAMESPACE={NAMESPACE}
      id={procedureId}
    >
      <Fields.TherapiesType treatmentId={treatmentId} />
      <Fields.OperationDate incidentId={incidentId} treatmentId={treatmentId} />
      <Fields.ProcedureCode procedureId={procedureId} />
      <Fields.ProcedureDescription />
      <Fields.ReimbursementPercentage treatmentId={treatmentId} procedureId={procedureId} />
      <Fields.SurgeryCategory />
    </Procedure.Section>
  );
};

export default connect((state: any, { NAMESPACE, procedureId }: any) => ({
  validating: state?.formCommonController.validating,
  procedureItem: state?.[NAMESPACE]?.claimEntities?.procedureListMap?.[procedureId],
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { dispatch, NAMESPACE, incidentId, procedureId, treatmentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveProcedureItem',
              payload: {
                changedFields,
                incidentId,
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
              incidentId,
              treatmentId,
              procedureId,
            },
          });
        }
        if (
          !!formUtils.queryValue(therapiesType) &&
          formUtils.queryValue(therapiesType) !== TherapiesTypeEnum.Surgery
        ) {
          dispatch({
            type: `${NAMESPACE}/removeProcedureItem`,
            payload: {
              treatmentId,
              procedureId,
            },
          });
        }
        if (formUtils.queryValue(therapiesType) === TherapiesTypeEnum.ICU) {
          dispatch({
            type: `${NAMESPACE}/saveTreatmentItem`,
            payload: {
              changedFields,
              treatmentId,
            },
          });
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
  })(ProcedureListItem)
);
