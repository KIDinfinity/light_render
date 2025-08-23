import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { IsAdjustment } from 'claim/enum/IsAdjustment';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import getPolicyYearValue from 'process/HKCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { PayableFields } from './Section';
import styles from './ServiceList.less';

const ServicePayableItem = ({ form, serviceItemPayableId, item, boosterData, hasBooster }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );
  const payableId = item?.payableId;
  const benefitCategory = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.benefitCategory
  );
  const coverageKey = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.coverageKey
  );

  const claimPayableListItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap[item?.payableId]
  );

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/payableItemDelete`,
      payload: {
        benefitCategory: eBenefitCategory.Reimbursement,
        sourceBoosterId: (item?.booster !== 'Y' && [boosterData?.id]) || [],
        sourceId: [serviceItemPayableId],
      },
    });
  };

  const handleRecover = (fieldName: string, id: string) => {
    dispatch({
      type: `${NAMESPACE}/benefitItemRecover`,
      payload: {
        benefitCategory,
        payableId: id,
        fieldName,
      },
    });
  };

  const boosterEditable = hasBooster;

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  return (
    <FormBorderCard
      button={{ visiable: editable, callback: handleDelete }}
      className={isAdjustMent && styles.isAdjustment}
      type="weight"
      borderColor={
        policyBackgrounds?.[
          `${form.getFieldValue('policyNo')}${getPolicyYearValue(claimPayableListItem)}`
        ]
      }
    >
      <Section form={form} editable={editable} section="Service">
        <PayableFields.PayableAmount
          id={serviceItemPayableId}
          coverageKey={coverageKey}
          benefitCategory={benefitCategory}
          OnRecover={() => handleRecover('payableAmount', serviceItemPayableId)}
        />
        <PayableFields.BenefitItemCode />
        <PayableFields.BoosterAmount
          id={boosterData?.id}
          coverageKey={coverageKey}
          benefitCategory={benefitCategory}
          boosterEditable={boosterEditable}
          originAmount={boosterData?.systemCalculationAmount}
          OnRecover={() => handleRecover('payableAmount', boosterData?.id)}
        />
        <PayableFields.DeductibleAmount
          onRecover={() => handleRecover('deductibleAmount', serviceItemPayableId)}
          id={serviceItemPayableId}
          coverageKey={coverageKey}
        />
        <PayableFields.DeductibleWaived
          onRecover={() => handleRecover('deductibleWaived', serviceItemPayableId)}
        />
        <PayableFields.DeductibleOtherInsurerDeduction
          onRecover={() => handleRecover('deductibleOtherInsurerDeduction', serviceItemPayableId)}
        />
        <PayableFields.PayableDays
          OnRecover={() => handleRecover('payableDays', serviceItemPayableId)}
        />
        <PayableFields.BoosterDays
          originDays={boosterData?.systemPayableDays}
          boosterEditable={boosterEditable}
          OnRecover={() => handleRecover('payableDays', boosterData?.id)}
        />
        <PayableFields.ExchangeRateInvoicePolicy />
        <PayableFields.Remark />
        <PayableFields.PolicyYear />
        <PayableFields.PolicyNo />
        <PayableFields.BenefitTypeCode />
        <PayableFields.SavingAmount />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { serviceItemPayableId }: any) => ({
    item: modelnamepsace.claimEntities?.serviceItemPayableListMap?.[serviceItemPayableId],
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const {
        dispatch,
        serviceItemPayableId,
        boosterData: { id: boosterId },
        policyBooster,
      } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveServicePayableItem',
          payload: {
            changedFields,
            serviceItemPayableId,
            hasBooster: policyBooster,
            boosterId,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { item, boosterData } = props;

      let extra = {};
      if (boosterData.booster === 'Y') {
        if (boosterData?.isStandaloneBooster === 'Y') {
          extra = {
            payableAmount: null,
            payableDays: null,
          };
        }

        extra = {
          ...extra,
          boosterAmount: boosterData?.payableAmount,
          boosterDays: boosterData?.payableDays,
        };
      }
      return formUtils.mapObjectToFields({
        ...item,
        ...extra,
      });
    },
  })(ServicePayableItem)
);
