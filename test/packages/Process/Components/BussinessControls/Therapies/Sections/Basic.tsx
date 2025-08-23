import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import type { FormComponentProps } from 'antd/lib/form';
import {
  removeProcedureItem,
  saveTreatmentItem,
} from 'process/HKCLM/ManualAssessment/_models/functions';
import { formUtils } from 'basic/components/Form';
import Therapies, { FieldsBasic as Fields } from 'process/Components/BussinessControls/Therapies';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';

interface IProps extends FormComponentProps {
  NAMESPACE: string;
  incidentId?: string;
  procedureId?: string;
  treatmentId?: string;
  procedureExpand?: boolean;
}

const Item = ({ form, NAMESPACE, treatmentId, procedureId }: IProps) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/saveEntry`,
      target: 'removeProcedureItem',
      payload: {
        treatmentId,
        procedureId,
      },
    });
    removeProcedureItem(dispatch, treatmentId, procedureId);
  };
  return (
    <Therapies.Section form={form} editable={editable} section="Procedure">
      <Fields.TherapiesType treatmentId={treatmentId} />
      <Fields.ProcedureCode procedureId={procedureId} />
    </Therapies.Section>
  );
};

export default connect((state: any, { NAMESPACE, procedureId }: any) => ({
  validating: state?.formCommonController.validating,
  item: state?.[NAMESPACE]?.claimEntities?.procedureListMap[procedureId],
}))(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { NAMESPACE, dispatch, procedureId, treatmentId, validating } = props;

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
        }
        if (formUtils.queryValue(therapiesType) === TherapiesTypeEnum.ICU) {
          saveTreatmentItem(dispatch, treatmentId, changedFields);
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      const therapiesType = lodash.has(item, 'therapiesType') ? item.therapiesType : 'Surgery';

      return formUtils.mapObjectToFields({ ...item, therapiesType });
    },
  })(Item)
);
