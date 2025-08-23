import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { getYearSuffix } from 'process/Utils';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';

const FactorItem = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="AdjustmentFactor">
      <Fields.PolicyYear />
      <Fields.FactorValue />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, factorItem, productCode, policyNo, incidentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveFactorItem',
          payload: {
            changedFields,
            factorCode: factorItem?.factorCode,
            productCode,
            policyNo,
            incidentId,
            policyYear: factorItem.policyYear,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { factorItem, isSelected } = props;
      return formUtils.mapObjectToFields({
        ...factorItem,
        isSelected: formUtils.queryValue(isSelected),
        policyYear:
          factorItem.displayByPolicyYear === 'Y'
            ? `${getYearSuffix(Number(factorItem.policyYear))} Policy Year`
            : null,
      });
    },
  })(FactorItem)
);
