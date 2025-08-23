import React from 'react';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { EProcedureType } from 'process/Enum';
import type { FormComponentProps } from 'antd/lib/form';
import { formUtils } from 'basic/components/Form';
import changeProcedureType from 'process/JPCLM/ManualAssessment/_models/functions/changeProcedureType';
import Section, { BasicFields as Fields } from './Section';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  otherProducerId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
}

const ItemBasicInfo = ({ form, treatmentId, otherProducerId }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const procedureType = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.otherProcedureListMap[otherProducerId]?.procedureType
  );

  return (
    <div className={`otherProcedure${procedureType}`}>
      <Section form={form} editable={editable} section="OtherProcedure.Basic">
        <Fields.TherapyType treatmentId={treatmentId} />
        <Fields.FromDate />
        <Fields.ToDate />
        <Fields.IrradiationContent />
        <Fields.OtherRadiationNames />
        <Fields.RadiationCategory otherProcedureId={otherProducerId} treatmentId={treatmentId} />
        <Fields.RadiationContent />
        <Fields.RadiationAppFlg />
        <Fields.KjCode />
        <Fields.TherapeuticDate />
        <Fields.TherapeuticDrug />
        <Fields.TherapeuticMonth />
      </Section>
    </div>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { otherProducerId }: any) => ({
    radiationItem: JPCLMOfClaimAssessment.claimEntities.otherProcedureListMap[otherProducerId],
    claimNo: JPCLMOfClaimAssessment.claimProcessData?.claimNo,

    validating: formCommonController.validating,
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, otherProducerId, treatmentId, validating, claimNo } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveOtherProcedureItem',
              payload: {
                changedFields,
                treatmentId,
                otherProcedureId: otherProducerId,
              },
            });
          }, 0);
        } else {
          const procedureType = formUtils.queryValue(changedFields?.procedureType);
          if (!lodash.isNil(procedureType)) {
            changeProcedureType({ dispatch, procedureType, treatmentId, claimNo });
            changedFields.procedureType = EProcedureType.Radiotherapy;
          }
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveOtherProcedureItem',
            payload: {
              changedFields,
              treatmentId,
              otherProcedureId: otherProducerId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { radiationItem } = props;

      return formUtils.mapObjectToFields(radiationItem);
    },
  })(ItemBasicInfo)
);
