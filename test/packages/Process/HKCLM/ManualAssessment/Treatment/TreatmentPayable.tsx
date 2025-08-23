import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import getPolicyYearValue from 'process/HKCLM/ManualAssessment/_models/functions/getPolicyYearValue'
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { PayableFields } from './Section';
import styles from './Payable.less';

const TreatmentPayable = ({ form, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  const claimPayableListItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.claimPayableListMap?.[item?.payableId]
  );

  const benefitCategory = item?.benefitCategory;

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeTreatmentPayableItem`,
      payload: {
        id: item?.id,
        benefitCategory: item?.benefitCategory,
      },
    });
  };

  const handleRecover = (fieldName: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        payableId: item?.id,
        fieldName,
      },
    });
  };

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  return (
    <FormBorderCard
      button={{ visiable: editable, callback: handleDelete }}
      className={isAdjustMent && styles.isAdjustment}
      type="weight"
      borderColor={policyBackgrounds?.[`${form.getFieldValue('policyNo')}${getPolicyYearValue(claimPayableListItem)}`]}
    >
      <Section form={form} editable={editable} section="TreatmentPayable">
        <PayableFields.PayableAmount
          benefitCategory={item?.benefitCategory}
          id={item?.id}
          coverageKey={item?.coverageKey}
          OnRecover={() => handleRecover('payableAmount')}
        />
        <PayableFields.BenefitItemCode />
        <PayableFields.PayableDays OnRecover={() => handleRecover('payableDays')} />
        <PayableFields.Remark />
        <PayableFields.PolicyYear />
        <PayableFields.PolicyNo />
        <PayableFields.BenefitTypeCode />
      </Section>
    </FormBorderCard>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, item } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveSummaryTreatmentPayable',
          payload: {
            changedFields,
            id: item?.id,
            benefitCategory: item?.benefitCategory,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(TreatmentPayable)
);
