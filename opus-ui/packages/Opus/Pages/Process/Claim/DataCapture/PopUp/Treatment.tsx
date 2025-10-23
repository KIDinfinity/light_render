import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';

import { NAMESPACE } from 'opus/Pages/Process/Claim/DataCapture/activity.config';
import Section, { TreatmentFields as Fields } from './Section';
import { SectionTitle } from '../Treatment/Section';
import Procedure from './Procedure';
import styles from './index.less';

const Treatment = ({ form, treatmentId, incidentId }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const treatmentNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.integration?.[incidentId]?.treatmentListMap[treatmentId].treatmentNo
  );
  const procedureList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.integration?.[incidentId]?.treatmentListMap?.[treatmentId]?.procedureList
  );
  return (
    <div>
      <div className={styles.title}>
        <SectionTitle suffix={` No. ${treatmentNo}`} />
      </div>
      <div className={styles.treatment}>
        <Section form={form} editable={editable} section="PopUp.Treatment" id={treatmentId}>
          <Fields.TreatmentStartDate />
          <Fields.TreatmentEndDate />
          <Fields.CountOfDPC />
          <Fields.CountOfHospitalization />
          <Fields.DateOfAdmissionEntry />
          <Fields.DateOfAdmissionOCR />
          <Fields.DateOfDischargeEntry />
          <Fields.DateOfDischargeOCR />
        </Section>
        {lodash.map(procedureList, (procedureId: any) => (
          <Procedure procedureId={procedureId} key={procedureId} incidentId={incidentId} />
        ))}
      </div>
    </div>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { treatmentId, incidentId }: any
  ) => ({
    validating: formCommonController.validating,
    treatmentItem: modelnamepsace.integration?.[incidentId]?.treatmentListMap?.[treatmentId],
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'popupTreatmentUpdate',
              payload: {
                changedFields,
                incidentId,
                treatmentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'popupTreatmentUpdate',
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
