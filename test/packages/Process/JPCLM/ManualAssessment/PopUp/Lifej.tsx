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
// 如果original 为 1 flag不可变且为 Original, 目前无法配置化该逻辑。
const replaceTenDaysHospitalizationFlgOriginal = (item: any) => {
  const newItem = { ...item } as any;
  if (newItem?.tenDaysHospitalizationFlgOriginal === '1') {
    newItem.tenDaysHospitalizationFlg = 'Y';
  }
  if (newItem?.tenDaysHospitalizationFlgLOriginal === '1') {
    newItem.tenDaysHospitalizationFlgL = 'Y';
  }
  return newItem;
};
export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    treatmentItem: JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId],
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
              type: 'JPCLMOfClaimAssessment/saveEntry',
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
            type: 'JPCLMOfClaimAssessment/saveFormData',
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
      console.log('test item: ', item);
      return formUtils.mapObjectToFields(replaceTenDaysHospitalizationFlgOriginal(item));
    },
  })(Klip7616)
);
