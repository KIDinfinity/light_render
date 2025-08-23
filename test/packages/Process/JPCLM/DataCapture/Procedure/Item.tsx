import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils, FormCard } from 'basic/components/Form';
import changeProcedureType from 'process/JPCLM/DataCapture/_models/functions/changeProcedureType';
import Section, { Fields } from './Section';

const ProcedureListItem = ({ form, procedureItem, incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const { treatmentId, id } = procedureItem;
  const layoutName = 'treatment-no-invoice-layout';

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfDataCapture/procedureDelete',
      payload: {
        treatmentId,
        procedureId: id,
      },
    });
  };

  const getIncidentDate = (state: any) =>
    state.JPCLMOfDataCapture.claimEntities.incidentListMap[incidentId]?.incidentDate;
  const getDateTimeOfDeath = (state: any) =>
    state.JPCLMOfDataCapture.claimProcessData.insured.dateTimeOfDeath;
  return (
    <FormCard showButton={editable} handleClick={handleDelete} className="procedureCard">
      <Section form={form} editable={editable} layoutName={layoutName} section="procedure">
        <Fields.TherapyType />
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
    </FormCard>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfDataCapture }: any, { procedureId }: any) => ({
    validating: formCommonController.validating,
    procedureItem: JPCLMOfDataCapture.claimEntities.procedureListMap[procedureId],
    claimNo: JPCLMOfDataCapture.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const {
        dispatch,
        validating,
        procedureItem: { id, treatmentId },
        claimNo,
      } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'procedureUpdate',
              payload: {
                changedFields,
                procedureId: id,
                treatmentId,
              },
            });
          }, 0);
        } else {
          const procedureType = formUtils.queryValue(changedFields?.procedureType);
          if (!lodash.isNil(procedureType) && procedureType !== 'SG') {
            dispatch({
              type: 'JPCLMOfDataCapture/procedureDelete',
              payload: {
                treatmentId,
                procedureId: id,
              },
            });
            changeProcedureType({ dispatch, procedureType, treatmentId, claimNo });
            return;
          }
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
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
      const procedureType = lodash.has(procedureItem, 'procedureType')
        ? procedureItem?.procedureType
        : 'SG';

      return formUtils.mapObjectToFields({ ...procedureItem, procedureType });
    },
  })(ProcedureListItem)
);
