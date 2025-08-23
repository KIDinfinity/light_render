import React from 'react';
import { NAMESPACE } from '../activity.config';

import { connect, useSelector, useDispatch } from 'dva';
import { Form } from 'antd';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import getPolicyYearValue from 'process/MYCLM/ManualAssessment/_models/functions/getPolicyYearValue';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { PayableFields } from './Section';
import getOriginData from '../_models/functions/adjustmentMapUtils';
import AdjustPayableItem from './AdjustPayableItem';

const ServicePayableItem = ({
  form,
  serviceItemPayableId,
  item,
  booster,
  policyBooster,
  isPayableEditable,
}: any) => {
  const payableId = item?.payableId;

  const editable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && isPayableEditable;
  const dispatch = useDispatch();
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

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
        sourceBoosterId: (item?.booster !== 'Y' && [booster?.id]) || [],
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

  return (
    <FormBorderCard
      button={{ visiable: editable, callback: handleDelete }}
      type="weight"
      borderColor={
        policyBackgrounds?.[
          `${form.getFieldValue('policyNo')}${getPolicyYearValue(claimPayableListItem)}`
        ]
      }
    >
      {item.isPayableAdjusted && (
        <AdjustPayableItem
          serviceItemPayableId={serviceItemPayableId}
          item={item}
          booster={booster}
          policyBooster={policyBooster}
        />
      )}
      <Section form={form} editable={editable} section="Service">
        <PayableFields.PayableAmount
          id={serviceItemPayableId}
          coverageKey={coverageKey}
          benefitCategory={benefitCategory}
          OnRecover={() => handleRecover('payableAmount', serviceItemPayableId)}
        />
        <PayableFields.BenefitItemCode />
      </Section>
      <Section form={form} editable={editable} section="Service">
        <PayableFields.PolicyNo />
        <PayableFields.BenefitTypeCode />
      </Section>
      <Section form={form} editable={editable} section="Service">
        <PayableFields.Remark />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  (
    { formCommonController, [NAMESPACE]: modelnamespace }: any,
    { serviceItemPayableId, payableId }: any
  ) => ({
    item: modelnamespace.claimEntities?.serviceItemPayableListMap?.[serviceItemPayableId],
    validating: formCommonController.validating,
    isPayableEditable:
      modelnamespace.claimEntities?.claimPayableListMap?.[payableId]?.isNewPayable ||
      !modelnamespace.claimProcessData?.appeal,
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const {
        dispatch,
        serviceItemPayableId,
        validating,
        booster,
        policyBooster,
        isPayableEditable,
      } = props;
      if (!isPayableEditable) return;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServicePayableItem',
              payload: {
                changedFields,
                serviceItemPayableId,
                hasBooster: policyBooster,
                boosterId: booster?.id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServicePayableItem',
            payload: {
              changedFields,
              serviceItemPayableId,
              hasBooster: policyBooster,
              boosterId: booster?.id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item, booster } = props;
      const extra = item?.booster === 'Y' ? { payableAmountBooster: null } : {};
      return formUtils.mapObjectToFields({
        ...(item.isPayableAdjusted ? getOriginData(item) : item),
        ...extra,
        boosterAmount: booster?.payableAmount,
        boosterDays: booster?.payableDays,
      });
    },
  })(ServicePayableItem)
);
