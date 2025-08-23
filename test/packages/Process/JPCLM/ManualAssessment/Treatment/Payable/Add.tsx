import React from 'react';
import { Form } from 'antd';

import { formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { connect, useSelector, useDispatch } from 'dva';
import Section, { PayableAddFields as Fields } from '../Section';

const TreatmentPayableListItemAdd = ({
  form,
  treatmentPayableItemDetail,
  incidentId,
  curTreatmentPayableList,
  treatmentItem,
}: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentType = formUtils.queryValue(treatmentItem.treatmentType);

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeTreatmentPayableAddItem',
    });
  };

  const policyCurrency = treatmentPayableItemDetail?.policyCurrency;

  return (
    <CardOfClaim
      className="TreatmentPayableItem"
      showButton
      handleClick={() => {
        handleDelete();
      }}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: 'var(--claim-card-treatmentpayablelistitem-bg-color)' }
          : {}
      }
    >
      <Section form={form} editable={editable} section="Treatment.Payable.Add">
        <Fields.AssessorOverrideAmount policyCurrency={policyCurrency} />
        <Fields.BenefitTypeCode
          treatmentPayableItemDetail={treatmentPayableItemDetail}
          curTreatmentPayableList={curTreatmentPayableList}
          treatmentType={treatmentType}
        />
        <Fields.PolicyNo incidentId={incidentId} />
        <Fields.ProductCode treatmentPayableItemDetail={treatmentPayableItemDetail} />
        <Fields.Remark />
        <Fields.SystemCalculationAmount policyCurrency={policyCurrency} />
        <Fields.PolicyYear />
      </Section>
    </CardOfClaim>
  );
};

export default connect(
  ({ formCommonController, JPCLMOfClaimAssessment }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    treatmentItem: JPCLMOfClaimAssessment.claimEntities.treatmentListMap[treatmentId],
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveTreatmentPayableAddItem',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveTreatmentPayableAddItem',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentPayableItemDetail } = props;

      return formUtils.mapObjectToFields(treatmentPayableItemDetail);
    },
  })(TreatmentPayableListItemAdd)
);
