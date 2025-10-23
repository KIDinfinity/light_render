import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';

const ProcedureListItem = ({
  form,
  procedureItem,
  incidentId,
  index,
  claimNo,
  procedureList,
}: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const { treatmentId, id } = procedureItem;

  const getIncidentDate = (state: any) =>
    state.opusClaimDataCapture.claimEntities.incidentListMap[incidentId]?.incidentDate;
  const getDateTimeOfDeath = (state: any) =>
    state.opusClaimDataCapture.claimProcessData.insured.dateTimeOfDeath;

  return (
    <Section form={form} editable={editable} section="Procedure">
      <Fields.TherapyType treatmentId={treatmentId} />
      <Fields.SurgicalSite />
      <Fields.ProcedureName treatmentId={treatmentId} procedureId={id} />
      <Fields.ProcedureCode />
      <Fields.KjCode />
      <Fields.HighReimbPct />
      <Fields.OperationDate
        getIncidentDate={getIncidentDate}
        getDateTimeOfDeath={getDateTimeOfDeath}
      />
      <Fields.ProcedureDescription />
      <Fields.SurgeryInstructionDate />
      <Fields.TransplantationSurgeryFlg />
      <Fields.BornMarrowFlg />
    </Section>
  );
};

export default connect(
  ({ formCommonController, opusClaimDataCapture }: any, { procedureId, treatmentId }: any) => ({
    validating: formCommonController.validating,
    procedureList:
      opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
    procedureItem: opusClaimDataCapture.claimEntities.procedureListMap[procedureId],
    claimNo: opusClaimDataCapture.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const {
        dispatch,
        validating,
        procedureItem: { id, treatmentId },
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'opusClaimDataCapture/saveEntry',
              target: 'procedureUpdate',
              payload: {
                changedFields,
                procedureId: id,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'opusClaimDataCapture/saveFormData',
            target: 'procedureUpdate',
            payload: {
              changedFields,
              procedureId: id,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { procedureItem } = props;

      return formUtils.mapObjectToFields(procedureItem);
    },
  })(ProcedureListItem)
);
