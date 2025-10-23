import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const OtherProcedure = ({ form, otherProcedureItem, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="otherProcedure">
      <Fields.TherapyType />
      <Fields.FromDate />
      <Fields.ToDate />
      <Fields.IrradiationContent />
      <Fields.OtherRadiationNames />
      <Fields.RadiationCategory otherProcedureItem={otherProcedureItem} />
      <Fields.ProcedureCode otherProcedureItem={otherProcedureItem} />
      <Fields.RadiationContent />
      <Fields.RadiationAppFlg />
      <Fields.KjCode />

      <Fields.TherapeuticDate />
      <Fields.TherapeuticDrug />
    </Section>
  );
};

export default connect(({ formCommonController, opusClaimAssessment }: any) => ({
  claimNo: opusClaimAssessment.claimProcessData?.claimNo,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, treatmentId, claimNo, otherProcedureItem } = props;
      const { id: otherProcedureId } = otherProcedureItem || {};
      if (formUtils.shouldUpdateState(changedFields)) {
        const procedureType = formUtils.queryValue(changedFields?.procedureType);

        dispatch({
          type: 'opusClaimAssessment/saveFormData',
          target: 'saveOtherProcedureItem',
          payload: {
            changedFields,
            treatmentId,
            otherProcedureId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { otherProcedureItem } = props;

      return formUtils.mapObjectToFields(otherProcedureItem);
    },
  })(OtherProcedure)
);
