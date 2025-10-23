import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import { subtract } from '@/utils/precisionUtils';
import ServiceItemPayable, {
  FieldsBasic as Fields,
} from 'process/Components/BussinessControls/ServiceItemPayable';

const ServiceItemPayableSection = ({ form, NAMESPACE, id, booster, hasBooster }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <ServiceItemPayable.Section
      form={form}
      editable={editable}
      section="ServicePayable"
      NAMESPACE={NAMESPACE}
      id={id}
    >
      <Fields.PayableAmount />
      <Fields.BenefitItemCode />
      <Fields.BillAmount />
      <Fields.CopayAmount />
      <Fields.UncoverAmount />
      <Fields.PayableDays />
      <Fields.Remark />
      <Fields.PolicyYear />
      <Fields.PolicyNo />
      <Fields.BenefitTypeCode />
      <Fields.IncurredAge />
      <Fields.DeductibleWaived />
      <Fields.DeductibleOtherInsurerDeduction />
      <Fields.BoosterDays booster={booster} boosterEditable={hasBooster} />
      <Fields.ExchangeRateInvoicePolicy />
      <Fields.PayableAmountBooster />
      <Fields.PayableDaysBooster />
      <Fields.BoosterAmount boosterEditable={hasBooster} booster={booster} />
      <Fields.DeductibleAmount />
    </ServiceItemPayable.Section>
  );
};

export default connect((state: any, { NAMESPACE, id }: any) => ({
  policyAgent: state?.[NAMESPACE]?.claimProcessData?.policyAgent,
  item: state?.[NAMESPACE]?.claimEntities?.serviceItemPayableListMap?.[id],
  validating: state?.formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id, validating, NAMESPACE } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        const extraPayload = tenant.region({
          [Region.HK]: () => ({
            boosterId: props?.booster?.id,
            policyBooster: props?.policyBooster,
          }),
          [Region.TH]: () => ({
            boosterId: props?.booster?.id,
            hasBooster: props?.hasBooster,
          }),
          notMatch: () => ({}),
        });

        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveServicePayableItem',
              payload: {
                changedFields,
                serviceItemPayableId: id,
                ...extraPayload,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveServicePayableItem',
            payload: {
              changedFields,
              serviceItemPayableId: id,
              ...extraPayload,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;

      const extraField = tenant.region({
        [Region.HK]: () => {
          const extra = item?.booster === 'Y' ? { payableAmountBooster: null } : {};
          return {
            ...extra,
            boosterAmount: props?.booster?.payableAmount,
            boosterDays: props?.booster?.payableDays,
          };
        },
        notMatch: () => ({
          uncoverAmount: subtract(
            formUtils.queryValue(item?.calculationAmount),
            formUtils.queryValue(item?.payableAmount)
          ),
        }),
      });

      return formUtils.mapObjectToFields({
        ...item,
        ...extraField,
      });
    },
  })(ServiceItemPayableSection)
);
