import React from 'react';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import getInvestigationResultConfirmationCategoryValue from '../../_models/functions/getInvestigationResultConfirmationCategoryValue';

import Section, { Lifej as Fields } from './Section';
import styles from './index.less';

const Klip7616 = ({ form, item }: any) => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  return (
    <div className={styles.klip}>
      <Section form={form} editable={editable} section="PopUp.lifej" id={item.id}>
        <Fields.InterestDays />
        <Fields.InterestFlag />
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
  (
    { formCommonController, [NAMESPACE]: modelnamepsace }: any,
    { treatmentId, incidentId }: any
  ) => ({
    validating: formCommonController.validating,
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
    claimTypeArray: modelnamepsace.claimEntities.incidentListMap[incidentId].claimTypeArray,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id, item } = props;
      const { incidentId } = item;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'klipCaseInfoUpdate',
          payload: {
            changedFields,
            id,
            incidentId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item, claimTypeArray } = props;
      return formUtils.mapObjectToFields({
        ...replaceTenDaysHospitalizationFlgOriginal(item),
        investigationResultConfirmationCategory: getInvestigationResultConfirmationCategoryValue(
          item?.investigationResultConfirmationCategory
        ),
        claimTypeArray,
      });
    },
  })(Klip7616)
);
