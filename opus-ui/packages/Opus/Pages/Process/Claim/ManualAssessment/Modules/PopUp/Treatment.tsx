import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';

import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import Section, { TreatmentFields as Fields } from './Section';
import { SectionTitle } from '../Treatment/Section';
import Procedure from './Procedure';
import styles from './index.less';

const Treatment = ({ form, treatmentId, incidentId, treatmentListMap, procedureListMap }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const treatmentItem = treatmentListMap[treatmentId];
  const {
    treatmentNo,
    procedureList
  } = treatmentItem;

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
          <Procedure procedureItem={procedureListMap[procedureId] || {}} key={procedureId} incidentId={incidentId} />
        ))}
      </div>
    </div>
  );
};

export default connect(
  ({ formCommonController }: any) => ({
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'treatmentUpdate',
          payload: {
            changedFields,
            incidentId,
            treatmentId,
            isPopupData: true,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentListMap, treatmentId } = props;
      return formUtils.mapObjectToFields(treatmentListMap[treatmentId] || {});
    },
  })(Treatment)
);
