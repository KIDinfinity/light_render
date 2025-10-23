import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import TreatmentPayable, {
  FieldsBasic as Fields,
} from 'process/Components/BussinessControls/TreatmentPayable';

const TreatmentPayableSection = ({ form, item, NAMESPACE }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <TreatmentPayable.Section
      form={form}
      editable={editable}
      section="TreatmentPayable"
      NAMESPACE={NAMESPACE}
      id={item?.id}
    >
      <Fields.PayableAmount />
      <Fields.BenefitItemCode />
      <Fields.PayableDays />
      <Fields.Remark />
      <Fields.PolicyYear />
      <Fields.PolicyNo />
      <Fields.BenefitTypeCode />
    </TreatmentPayable.Section>
  );
};

export default connect((state: any) => ({
  validating: state?.formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, validating, item, NAMESPACE } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveSummaryTreatmentPayable',
              payload: {
                changedFields,
                id: item?.id,
                benefitCategory: item?.benefitCategory,
              },
            });
          }, 0);
        } else {
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
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(TreatmentPayableSection)
);
