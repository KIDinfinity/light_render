import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import changeProcedureType from 'process/JPCLM/ManualAssessment/_models/functions/changeProcedureType';
import { formUtils } from 'basic/components/Form';
import { EProcedureType } from 'process/Enum';
import Section, { BasicFields as Fields } from './Section';

const ProcedureListItemOfBasicInfo = ({ form, incidentId, treatmentId, procedureId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const layoutName = 'treatment-no-invoice-layout';

  return (
    <div className="procedureCard">
      <Section form={form} editable={editable} layoutName={layoutName} section="Procedure.Basic">
        <Fields.TherapyType treatmentId={treatmentId} />
        <Fields.KjCode />
        <Fields.HighReimbPct />
        <Fields.OperationDate incidentId={incidentId} />
        <Fields.ProcedureCode />
        <Fields.ProcedureDescription treatmentId={treatmentId} procedureId={procedureId} />
        <Fields.ProcedureName procedureId={procedureId} />
        <Fields.SurgeryInstructionDate />
        <Fields.SurgicalSite />
        <Fields.TransplantationSurgeryFlag />
        <Fields.BornMarrowFlg />
      </Section>
    </div>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { procedureId }: any) => ({
    validating: formCommonController.validating,
    claimNo: JPCLMOfClaimAssessment.claimProcessData?.claimNo,
    procedureItem: JPCLMOfClaimAssessment.claimEntities?.procedureListMap?.[procedureId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, procedureId, treatmentId, validating, claimNo } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveProcedureItem',
              payload: {
                changedFields,
                treatmentId,
                procedureId,
              },
            });
          }, 0);
        } else {
          const procedureType = formUtils.queryValue(changedFields?.procedureType);
          if (!lodash.isNil(procedureType) && procedureType !== EProcedureType.Surgical) {
            dispatch({
              type: 'JPCLMOfClaimAssessment/removeProcedureItem',
              payload: {
                treatmentId,
                procedureId,
              },
            });
            changeProcedureType({ dispatch, procedureType, treatmentId, claimNo });
          }
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveProcedureItem',
            payload: {
              changedFields,
              treatmentId,
              procedureId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { procedureItem } = props;
      const procedureType = lodash.has(procedureItem, 'procedureType')
        ? procedureItem?.procedureType
        : EProcedureType.Surgical;
      return formUtils.mapObjectToFields({ ...procedureItem, procedureType });
    },
  })(ProcedureListItemOfBasicInfo)
);
