import React from 'react';
import { Form } from 'antd';
import CardOfClaim from 'basic/components/Form/FormCard';
import { formUtils } from 'basic/components/Form';
import { connect, useSelector, useDispatch } from 'dva';
import Section, { PayableFields as Fields } from './Section';
import RadioTherapyReasonDateGroupList from './RadioTherapyReasonDateGroupList';
import moment from 'moment';
import lodash from 'lodash';

const OtherProcedurePayableItem = ({
  form,
  id,
  isAdd,
  treatmentId,
  otherProcedurePayableItem,
  otherProcedureId,
}: any) => {
  const dispatch = useDispatch();

  const { treatmentPayableId } = otherProcedurePayableItem;

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController.policyBackgrounds
  );

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeOtherProcedurePayableItem',
      payload: {
        treatmentPayableId,
        id,
      },
    });
  };

  return (
    <CardOfClaim
      className="otherProcedurePayableItem"
      showButton={!!editable}
      handleClick={handleDelete}
      cardStyle={
        policyBackgrounds && form.getFieldValue('policyNo')
          ? { background: policyBackgrounds[form.getFieldValue('policyNo')] }
          : {}
      }
    >
      <Section form={form} editable={editable} section="OtherProcedure.Payable">
        <Fields.AssessorOverrideAmount otherProcedurePayableItem={otherProcedurePayableItem} />
        <Fields.AssessorOverrideMultiple otherProcedurePayableItem={otherProcedurePayableItem} />
        <Fields.BenefitItemCode payableId={id} />
        <Fields.BenefitTypeCode />
        <Fields.PolicyNo />
        <Fields.ProductCode />
        <Fields.ReimbursementMultiple />
        <Fields.Remark />
        <Fields.SystemCalculationAmount />
        <Fields.RadioTherapyReasonDate1 />
        <Fields.RadioTherapyReasonDate2 />
        <Fields.TreatmentTimes otherProcedureId={otherProcedureId} />
        <Fields.AssessorOverrideTimes otherProcedureId={otherProcedureId} />
        <Fields.RadioDateList otherProcedureId={otherProcedureId} />
      </Section>
      <RadioTherapyReasonDateGroupList
        otherProcedurePayableItem={otherProcedurePayableItem}
        treatmentId={treatmentId}
        radioTherapyReasonDateGroup={otherProcedurePayableItem.radioDateList}
        isAdd={isAdd}
      />
    </CardOfClaim>
  );
};

export default connect(({ JPCLMOfClaimAssessment, formCommonController }: any) => ({
  validating: formCommonController.validating,
  claimPayableListMap: JPCLMOfClaimAssessment.claimEntities.claimPayableListMap,
}))(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch, id, validating }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveOtherProcedurePayableItem',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveOtherProcedurePayableItem',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { otherProcedurePayableItem, claimPayableListMap }: any = props;
      const benefitCategory =
        claimPayableListMap?.[otherProcedurePayableItem?.payableId]?.benefitCategory || '';
      const radioDateList = lodash.map(
        formUtils.queryValue(otherProcedurePayableItem.radioDateList),
        (item) => moment(item).format('YYYY/MM/DD')
      );
      return formUtils.mapObjectToFields({
        ...otherProcedurePayableItem,
        benefitCategory,
        radioDateList,
      });
    },
  })(OtherProcedurePayableItem)
);
