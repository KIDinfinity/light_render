import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const OtherProcedure = ({ form, otherProcedureItem, incidentId }: any) => {
  const dispatch = useDispatch();
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

export default connect(({ formCommonController, opusClaimDataCapture }: any) => ({
  validating: formCommonController.validating,
  claimNo: opusClaimDataCapture.claimProcessData?.claimNo,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, treatmentId, claimNo, otherProcedureItem } = props;
      const { id: otherProcedureId } = otherProcedureItem || {};
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimDataCapture/saveEntry',
              target: 'otherProcedureUpdate',
              payload: {
                changedFields,
                otherProcedureId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          const procedureType = formUtils.queryValue(changedFields?.procedureType);
          if (!lodash.isNil(procedureType)) {
            dispatch({
              type: 'opusClaimDataCapture/saveFormData',
              target: 'otherProcedureDelete',
              payload: {
                changedFields,
                otherProcedureId,
                treatmentId,
                dispatch,
              },
            });
            return;
          }
          dispatch({
            type: 'opusClaimDataCapture/saveFormData',
            target: 'otherProcedureUpdate',
            payload: {
              changedFields,
              otherProcedureId,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { otherProcedureItem } = props;

      return formUtils.mapObjectToFields(otherProcedureItem);
    },
  })(OtherProcedure)
);
