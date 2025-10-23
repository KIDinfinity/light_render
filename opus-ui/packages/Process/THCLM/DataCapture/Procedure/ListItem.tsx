import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';

import lodash from 'lodash';
import {
  removeProcedureItem,
  saveTreatmentItem,
} from 'process/THCLM/DataCapture/_models/functions';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import Section, { Fields } from './Section';
import styles from './ProcedureList.less';

const ProcedureListItem = ({ form, procedureId, treatmentId, incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const handleDelete = () => {
    removeProcedureItem(dispatch, treatmentId, procedureId);
  };
  return (
    <FormBorderCard
      marginBottom
      className={styles.itemCard}
      button={{ visiable: editable, callback: handleDelete }}
    >
      <Section form={form} editable={editable} section="Procedure">
        <Fields.TherapiesType treatmentId={treatmentId} />
        <Fields.OperationDate incidentId={incidentId} treatmentId={treatmentId} />
        <Fields.ProcedureCode procedureId={procedureId} />
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
      const { dispatch, incidentId, procedureId, treatmentId, validating } = props;
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
          removeProcedureItem(dispatch, treatmentId, procedureId);
        }
        if (formUtils.queryValue(therapiesType) === TherapiesTypeEnum.ICU) {
          saveTreatmentItem(dispatch, treatmentId, changedFields);
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
