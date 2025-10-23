import React from 'react';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { FormCard, formUtils } from 'basic/components/Form';
import Section, { PayableFields as Fields } from './Section';
import styles from './PayableItem.less';

const ServiceItemPayableListItem = ({
  form,
  serviceItemPayableItem,
  curServicePayableList,
}: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const claimPayableItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities?.claimPayableListMap?.[serviceItemPayableItem?.payableId]
  );

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const { benefitCategory, coverageKey } = claimPayableItem;

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeServicePayableItem',
      payload: {
        invoicePayableItemId: serviceItemPayableItem.invoicePayableId,
        serviceItemPayableItemId: serviceItemPayableItem.id,
      },
    });
  };

  return (
    <div className={styles.serviceItemPayableListItem}>
      <FormCard
        className="servicePayableItem"
        showButton={editable}
        handleClick={handleDelete}
        cardStyle={
          policyBackgrounds && form.getFieldValue('policyNo')
            ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
            : {}
        }
      >
        <Section form={form} editable={editable} section="ServiceItem.Payable">
          <Fields.AssessorOverrideAmount
            claimPayableItem={claimPayableItem}
            serviceItemPayableItem={serviceItemPayableItem}
            coverageKey={coverageKey}
            benefitCategory={benefitCategory}
          />
          <Fields.BenefitItemCode
            curServicePayableList={curServicePayableList}
            serviceItemPayableItem={serviceItemPayableItem}
          />
          <Fields.BenefitTypeCode />
          <Fields.DeductibleAmount
            claimPayableItem={claimPayableItem}
            serviceItemPayableItem={serviceItemPayableItem}
          />
          <Fields.PayableDays claimPayableItem={claimPayableItem} />
          <Fields.PolicyNo />
          <Fields.ProductCode />
          <Fields.Remark />
          <Fields.SystemCalculationAmount serviceItemPayableItem={serviceItemPayableItem} />
        </Section>
      </FormCard>
    </div>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { serviceItemPayableId }: any) => ({
    validating: formCommonController.validating,
    serviceItemPayableItem:
      JPCLMOfClaimAssessment.claimEntities?.serviceItemPayableListMap?.[serviceItemPayableId],
  })
)(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, serviceItemPayableId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveServicePayableItem',
              payload: {
                changedFields,
                serviceItemPayableId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveServicePayableItem',
            payload: {
              changedFields,
              serviceItemPayableId,
            },
          });
        }
      }
    },

    mapPropsToFields(props) {
      const { serviceItemPayableItem } = props;

      return formUtils.mapObjectToFields(serviceItemPayableItem);
    },
  })(ServiceItemPayableListItem)
);
