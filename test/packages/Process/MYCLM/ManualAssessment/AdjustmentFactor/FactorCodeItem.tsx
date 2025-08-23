import React from 'react';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import Section, { Fields } from './Section';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../activity.config';

const FactorCodeList = ({ form, factorKey, factorItem }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section form={form} editable={editable} section="AdjustmentFactor" register={false}>
      <Fields.IsSelect
        dictCode={factorItem.factorCode}
        parentFactorCode={factorItem.parentFactorCode}
        factorKey={factorKey}
      />
    </Section>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, factorItem, productCode, policyNo, incidentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveFactorItemSelect',
              payload: {
                changedFields,
                factorCode: factorItem?.factorCode,
                productCode,
                policyNo,
                incidentId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveFactorItemSelect',
            payload: {
              changedFields,
              factorCode: factorItem?.factorCode,
              productCode,
              policyNo,
              incidentId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { factorItem } = props;
      return formUtils.mapObjectToFields(factorItem);
    },
  })(FactorCodeList)
);
