import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import changeProcedureType from 'process/JPCLM/DataCapture/_models/functions/changeProcedureType';
import { formUtils, FormCard } from 'basic/components/Form';
import Section, { Fields } from './Section';

const OtherProcedure = ({ form, otherProcedureItem, incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const layoutName = 'treatment-no-invoice-layout';

  const handleDelete = () => {
    const { id: otherProcedureId, treatmentId } = otherProcedureItem;

    dispatch({
      type: 'JPCLMOfDataCapture/otherProcedureDelete',
      payload: {
        treatmentId,
        otherProcedureId,
      },
    });
  };

  return (
    <FormCard
      showButton={editable}
      handleClick={handleDelete}
      className={`otherProcedure${otherProcedureItem?.procedureType}`}
    >
      <Section form={form} editable={editable} layoutName={layoutName} section="otherProcedure">
        <Fields.TherapyType />
        <Fields.FromDate />
        <Fields.ToDate />
        <Fields.IrradiationContent />
        <Fields.OtherRadiationNames />
        <Fields.RadiationCategory otherProcedureItem={otherProcedureItem} />
        <Fields.RadiationContent />
        <Fields.TherapeuticDate />
        <Fields.TherapeuticDrug />
        <Fields.TherapeuticMonth />
        <Fields.RadiationAppFlg />
        <Fields.KjCode />
      </Section>
    </FormCard>
  );
};

export default connect(({ formCommonController, JPCLMOfDataCapture }: any) => ({
  validating: formCommonController.validating,
  claimNo: JPCLMOfDataCapture.claimProcessData?.claimNo,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, treatmentId, claimNo, otherProcedureItem } = props;
      const { id: otherProcedureId } = otherProcedureItem || {};
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
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
              type: 'JPCLMOfDataCapture/otherProcedureDelete',
              payload: {
                treatmentId,
                otherProcedureId,
              },
            });
            changeProcedureType({ dispatch, procedureType, treatmentId, claimNo });
            return;
          }
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
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
