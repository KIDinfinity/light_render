import React from 'react';
import { useSelector, connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { EProcedureType } from 'process/Enum';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { isAdjustmentFun } from 'opus/Pages/Process/Claim/ManualAssessment/_models/functions';
import Section, { Fields } from './Section';

const Index = ({ treatmentId, groupId, incidentId, form, filteredTreatmentList }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isAdjustmentValue = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.claimEntities.treatmentListMap[treatmentId]?.isAdjustment
  );
  const isAdjustment = isAdjustmentFun(isAdjustmentValue);

  return (
    <Section form={form} editable={!isAdjustment && editable} section="OutpatientDateGroup">
      <Fields.TherapyType />
      <Fields.DiagnosisName incidentId={incidentId} treatmentId={treatmentId} />
      <Fields.ConsultationDate
        treatmentId={treatmentId}
        groupId={groupId}
        filteredTreatmentList={filteredTreatmentList}
      />
      <Fields.ConsultationNo />
    </Section>
  );
};

export default connect(({ opusClaimAssessment }: any, { treatmentId, groupId }: any) => ({
  filteredTreatmentList: opusClaimAssessment.claimEntities?.treatmentListMap?.[
    treatmentId
  ]?.opTreatmentList?.filter((el: any) => el.group === groupId),
  opTreatmentPayableListMap: opusClaimAssessment.claimEntities.opTreatmentPayableListMap,
  isAdjustmentValue: opusClaimAssessment.claimEntities.treatmentListMap[treatmentId]?.isAdjustment,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, groupId, treatmentId } = props;
      delete changedFields.outpatientTreatmentDate;
      delete changedFields.consulationNo;
      delete changedFields.procedureType;

      if (!lodash.size(changedFields)) {
        return;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimAssessment/saveEntry',
              target: 'opTreatmentListUpdate',
              payload: {
                changedFields,
                groupId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'opusClaimAssessment/saveFormData',
            target: 'opTreatmentListUpdate',
            payload: {
              changedFields,
              groupId,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { filteredTreatmentList, opTreatmentPayableListMap, isAdjustmentValue } = props;

      const diagnosisIdList = isAdjustmentFun(isAdjustmentValue)
        ? {
            diagnosisIdList: lodash
              .chain(opTreatmentPayableListMap)
              .filter((item) => item.opTreatmentId === filteredTreatmentList?.[0]?.id)
              .map('diagnosisCode')
              .uniq()
              .compact()
              .value(),
          }
        : {};

      return formUtils.mapObjectToFields({
        ...lodash.omit(filteredTreatmentList?.[0], 'outpatientTreatmentDate'),
        consulationNo:
          filteredTreatmentList?.filter(({ outpatientTreatmentDate }) => outpatientTreatmentDate)
            ?.length || 0,
        procedureType: EProcedureType.OP,
        ...diagnosisIdList,
      });
    },
  })(Index)
);
