import React from 'react';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { LifePayable as Fields } from '../Section';
import getOriginData from '../../_models/functions/adjustmentMapUtils';

const LifePayableItem = ({ form, item, isPayableEditable }: any) => {
  const editable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && isPayableEditable;

  const policyBackgrounds = useSelector(
    ({ formCommonController }: any) => formCommonController?.policyBackgrounds
  );

  return (
    <FormBorderCard type="weight" borderColor={policyBackgrounds?.[`${item?.policyNo}`]}>
      <Section
        formId="SummaryPayable.LifePayable"
        form={form}
        editable={editable}
        section="SummaryPayable.LifePayable"
      >
        <Fields.BenefitItemCode />
        <Fields.PayableAmount />
        <Fields.ReimbursementPercentage />
        <Fields.PolicyNo />
        <Fields.ProductCode />
        <Fields.BenefitTypeCode />
        <Fields.Sumassured />
        <Fields.RefundAmount />
      </Section>
    </FormBorderCard>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, id, isPayableEditable } = props;
      if (formUtils.shouldUpdateState(changedFields) && isPayableEditable) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveLifePayable',
          payload: {
            changedFields,
            claimPayableId: id,
            validating: lodash.size(changedFields) > 1,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      let { item, id } = props;
      if (item.isPayableAdjusted) {
        item = getOriginData(item);
      }

      return formUtils.mapObjectToFields({ ...item, id });
    },
  })(LifePayableItem)
);
