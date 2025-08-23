import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import Section, { Lifej as Fields } from './Section';
import styles from './index.less';

const Klip7616 = ({ form }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  return (
    <div className={styles.klip}>
      <Section form={form} editable={editable} section="PopUp.lifej">
        <Fields.InterestDays />
        <Fields.InvestigationResultConfirmationCategory />
        <Fields.OutstandingPremiumDate />
        <Fields.MedicalCertificateArrivalDate />
        <Fields.MaterialFee />
        <Fields.TenDaysHospitalizationFlg />
        <Fields.TenDaysHospitalizationFlgL />
        <Fields.InterestBasedDate />
      </Section>
    </div>
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
      const { dispatch, id, validating, item } = props;
      const { incidentId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfDataCapture/saveEntry',
              target: 'klipCaseInfoUpdate',
              payload: {
                changedFields,
                id,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfDataCapture/saveFormData',
            target: 'klipCaseInfoUpdate',
            payload: {
              changedFields,
              id,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Klip7616)
);
