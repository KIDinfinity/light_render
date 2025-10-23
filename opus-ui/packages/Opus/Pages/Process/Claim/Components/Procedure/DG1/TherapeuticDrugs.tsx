import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
const TherapeuticDrugs = ({ form, otherProcedureId, antiCancerProcedureItem, idx }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const { therapeuticMonth } = antiCancerProcedureItem;
  return (
    <Section form={form} section="TherapeuticMonthList" editable={editable}>
      <Fields.TherapeuticDrugs
        otherProcedureId={otherProcedureId}
        therapeuticMonth={therapeuticMonth}
        idx={idx}
      />
      <Fields.TherapeuticDrugNameDesc />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  //opusClaimDataCapture
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, otherProcedureId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          dispatch({
            type: 'opusClaimDataCapture/therapeuticDrugListUpdate',
            payload: {
              otherProcedureId,
              changedFields,
            },
          });
        } else {
          dispatch({
            type: 'opusClaimDataCapture/therapeuticDrugListUpdate',
            payload: {
              otherProcedureId,
              changedFields,
            },
          });
        }
      }
    },

    mapPropsToFields({ antiCancerProcedureItem }: any) {
      return formUtils.mapObjectToFields(antiCancerProcedureItem);
    },
  })(TherapeuticDrugs)
);
