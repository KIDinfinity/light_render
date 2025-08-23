import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';

import lodash from 'lodash';
import { removeProcedureItem, TherapiesHandler } from 'process/PHCLM/DataCapture/_models/functions';
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
        <Fields.OperationDate treatmentId={treatmentId} incidentId={incidentId} />
        <Fields.ProcedureCode procedureId={procedureId} />
        <Fields.ProcedureDescription />
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
          if(lodash.size(changedFields) === 1)
            TherapiesHandler({
              previousType: TherapiesTypeEnum.Surgery,
              treatmentId,
              id: procedureId,
              dispatch,
              changedFields,
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
