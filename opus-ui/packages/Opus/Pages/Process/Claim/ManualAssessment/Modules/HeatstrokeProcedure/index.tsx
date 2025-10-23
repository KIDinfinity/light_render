import React from 'react';
import { useSelector, connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Index = ({ otherProcedureItem, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="HeatstrokeTherapy">
      <Fields.TherapyType />
      <Fields.IntravenousTreatment />
      <Fields.FirstTreatmentDate otherProcedureItem={otherProcedureItem} />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, otherProcedureItem, validating } = props;
      const otherProcedureId = otherProcedureItem?.id;

      if (lodash.size(changedFields) && formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          dispatch({
            type: 'opusClaimAssessment/saveEntry',
            target: 'opusClaimAssessment/therapeuticDrugListUpdate',
            payload: {
              otherProcedureId,
              changedFields,
            },
          });
        } else {
          dispatch({
            type: 'opusClaimAssessment/saveFormData',
            target: 'opusClaimAssessment/therapeuticDrugListUpdate',
            payload: {
              otherProcedureId,
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { otherProcedureItem } = props;

      return formUtils.mapObjectToFields({
        id: otherProcedureItem.id,
        procedureType: otherProcedureItem.procedureType,
        intravenousTreatment: otherProcedureItem.intravenousTreatment,
        therapeuticMonthList: otherProcedureItem.therapeuticMonthList,
      });
    },
  })(Index)
);
