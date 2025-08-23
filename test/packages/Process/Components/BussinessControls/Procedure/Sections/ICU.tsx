import React from 'react';
import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import Procedure, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Procedure';

const ListItemICU = ({ form, NAMESPACE, editable, treatmentId }: any) => {
  return (
    <Procedure.Section
      form={form}
      editable={editable}
      section="Procedure"
      NAMESPACE={NAMESPACE}
      id={treatmentId}
    >
      <Fields.TherapiesType treatmentId={treatmentId} />
      <Fields.IcuFromDate treatmentId={treatmentId} />
      <Fields.IcuToDate treatmentId={treatmentId} />
      <Fields.IcuDays treatmentId={treatmentId} />
    </Procedure.Section>
  );
};

export default connect((state: any, { NAMESPACE, treatmentId }: any) => ({
  validating: state?.formCommonController.validating,
  treatmentItem: state?.[NAMESPACE]?.claimEntities?.treatmentListMap?.[treatmentId],
  claimNo: state?.[NAMESPACE]?.claimProcessData?.claimNo,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { NAMESPACE, dispatch, incidentId, treatmentId, validating, claimNo } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveTreatmentItem',
              payload: {
                changedFields,
                incidentId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveTreatmentItem',
            payload: {
              changedFields,
              incidentId,
              treatmentId,
            },
          });
        }
        if (formUtils.queryValue(therapiesType) === TherapiesTypeEnum.Surgery) {
          dispatch({
            type: `${NAMESPACE}/addProcedureItem`,
            payload: {
              treatmentId,
              procedureId: uuidv4(),
              changedFields,
              claimNo,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      const therapiesTypeValue = treatmentItem.icu ? 'ICU' : '';
      const therapiesType = lodash.has(treatmentItem, 'therapiesType')
        ? treatmentItem.therapiesType
        : therapiesTypeValue;
      return formUtils.mapObjectToFields({ ...treatmentItem, therapiesType });
    },
  })(ListItemICU)
);
