import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';

import lodash from 'lodash';
import { addTherapiesItem } from 'process/THCLM/ManualAssessment/_models/functions';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import Section, { Fields } from './Section';

const ListItemICU = ({ form, treatmentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeICUItem`,
      payload: {
        treatmentId,
      },
    });
  };
  return (
    <FormBorderCard button={{ visiable: editable, callback: handleDelete }} marginBottom>
      <Section form={form} editable={editable} section="ICU">
        <Fields.TherapiesTypeICU treatmentId={treatmentId} />
        <Fields.IcuFromDate treatmentId={treatmentId} />
        <Fields.IcuToDate treatmentId={treatmentId} />
        <Fields.IcuDays treatmentId={treatmentId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
    validating: formCommonController.validating,
    claimNo: modelnamepsace.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { therapiesType } = changedFields;
      const { dispatch, incidentId, treatmentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
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
        if (
          !!formUtils.queryValue(therapiesType) &&
          formUtils.queryValue(therapiesType) !== TherapiesTypeEnum.ICU
        ) {
          addTherapiesItem({ dispatch, changedFields, treatmentId });
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
