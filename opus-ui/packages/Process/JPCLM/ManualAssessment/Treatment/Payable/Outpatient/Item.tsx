import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import Section, { OutpatientFields as Fields } from '../../Section';
import { transRemarkCodeToMsg } from 'claim/pages/utils/taskUtils';
import Button from '../Button';
import styles from './Item.less';

const OutpatientItem = ({
  form,
  incidentId,
  treatmentId,
  treatmentPayableId,
  opTreatmentPayableId,
  layoutName,
  cardStyle,
  opTreatmentPayableItem,
}: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeOPTreatmentPayableItem',
      payload: {
        opTreatmentPayableId,
        treatmentPayableId,
      },
    });
  };

  return (
    <CardOfClaim
      className={styles.OutpatientItem}
      showButton={!!editable}
      extraButton={
        <Button
          treatmentId={treatmentId}
          incidentId={incidentId}
          treatmentPayableItemId={treatmentPayableId}
          opTreatmentPayableId={opTreatmentPayableId}
        />
      }
      showButton
      handleClick={handleDelete}
      cardStyle={{ width: '6px', ...cardStyle }}
    >
      <Section
        form={form}
        editable={editable}
        layoutName={layoutName}
        section="Treatment.Outpatient"
      >
        <Fields.OutpatientDate treatmentId={treatmentId} treatmentPayableId={treatmentPayableId} />
        <Fields.PayableDays />
        <Fields.PayableAmount />
        <Fields.SystemPayableDays />
        <Fields.SystemCalculationAmount />
        <Fields.AssessorOverrideDays opTreatmentPayableItem={opTreatmentPayableItem} />
        <Fields.AssessorOverrideAmount />
        <Fields.HospitalizationSequentialNo />
        <Fields.DiagnosisCode treatmentId={treatmentId} />
        <Fields.Remark />
      </Section>
    </CardOfClaim>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { opTreatmentPayableId }: any) => ({
    validating: formCommonController.validating,
    opTreatmentPayableItem:
      JPCLMOfClaimAssessment?.claimEntities?.opTreatmentPayableListMap?.[opTreatmentPayableId],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, opTreatmentPayableId, validating, treatmentPayableId, treatmentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveOPTreatmentPayableItem',
              payload: {
                changedFields,
                opTreatmentPayableId,
                treatmentPayableId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveOPTreatmentPayableItem',
            payload: {
              changedFields,
              opTreatmentPayableId,
              treatmentPayableId,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { opTreatmentPayableItem } = props;
      const remark = transRemarkCodeToMsg(opTreatmentPayableItem.remark, true);
      return formUtils.mapObjectToFields({
        ...opTreatmentPayableItem,
        remark,
      });
    },
  })(OutpatientItem)
);
