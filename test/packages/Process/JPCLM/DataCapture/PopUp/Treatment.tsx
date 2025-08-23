import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import Section, { TreatmentFields as Fields } from './Section';
import { SectionTitle } from '../Treatment/Section';
import Procedure from './Procedure';
import styles from './index.less';

const Treatment = ({ form, treatmentId, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const procedureList = useSelector(
    (state: any) =>
      state.JPCLMOfDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList
  );
  const treatmentNo = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId]?.treatmentNo
  );

  return (
    <>
      <div className={styles.title}>
        <SectionTitle suffix={` No. ${treatmentNo}`} />
      </div>
      <div className={styles.treatment}>
        <Section form={form} editable={editable} section="PopUp.Treatment">
          <Fields.CountOfDPC />
          <Fields.CountOfHospitalization />
          <Fields.DateOfAdmissionEntry />
          <Fields.DateOfAdmissionOCR />
          <Fields.DateOfDischargeEntry />
          <Fields.DateOfDischargeOCR />
          <Fields.TreatmentStartDate />
          <Fields.TreatmentEndDate />
        </Section>
        {lodash.map(procedureList, (procedureId: any) => (
          <Procedure procedureId={procedureId} key={procedureId} incidentId={incidentId} />
        ))}
      </div>
    </>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfDataCapture }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    treatmentItem: JPCLMOfDataCapture.claimEntities.treatmentListMap[treatmentId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'treatmentUpdate',
              payload: {
                changedFields,
                incidentId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'treatmentUpdate',
            payload: {
              changedFields,
              incidentId,
              treatmentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Treatment)
);
