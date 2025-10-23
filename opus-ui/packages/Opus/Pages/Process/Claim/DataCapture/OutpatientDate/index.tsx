import React from 'react';
import { useDispatch, useSelector, connect } from 'dva';
import lodash from 'lodash';
import { Form } from 'antd';
import { EProcedureType } from 'process/Enum';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const Index = ({ treatmentId, groupId, incidentId, form, filteredTreatmentList }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const diagnosisListMap = useSelector(
    ({ opusClaimDataCapture }: any) => opusClaimDataCapture.claimEntities.diagnosisListMap
  );

  const incidentDiagnosisIdList =
    useSelector(
      ({ opusClaimDataCapture }: any) =>
        opusClaimDataCapture.claimEntities.incidentListMap?.[incidentId]?.diagnosisList
    ) || [];

  const diagnosisList =
    lodash.filter(
      diagnosisListMap,
      (dictionasis) =>
        lodash.some(incidentDiagnosisIdList, (id) => id === dictionasis.id) &&
        formUtils.queryValue(dictionasis.diagnosisName) &&
        formUtils.queryValue(dictionasis.diagnosisName) !== ''
    ) || [];

  return (
    <>
      <Section form={form} editable={editable} section="OutpatientDateGroup">
        <Fields.TherapyType />
        <Fields.DiagnosisName incidentId={incidentId} />
        <Fields.ConsultationDate
          treatmentId={treatmentId}
          groupId={groupId}
          filteredTreatmentList={filteredTreatmentList}
        />
        <Fields.ConsultationNo />
      </Section>
    </>
  );
};

export default connect(({ opusClaimDataCapture }: any, { treatmentId, groupId }: any) => ({
  filteredTreatmentList: opusClaimDataCapture.claimEntities?.treatmentListMap?.[
    treatmentId
  ]?.opTreatmentList?.filter((el: any) => el.group === groupId),
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
              type: 'opusClaimDataCapture/saveEntry',
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
            type: 'opusClaimDataCapture/saveFormData',
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
      const { filteredTreatmentList } = props;
      return formUtils.mapObjectToFields({
        ...lodash.omit(filteredTreatmentList?.[0], 'outpatientTreatmentDate'),
        consulationNo:
          filteredTreatmentList?.filter(({ outpatientTreatmentDate }) => outpatientTreatmentDate)
            ?.length || 0,
        procedureType: EProcedureType.OP,
      });
    },
  })(Index)
);
