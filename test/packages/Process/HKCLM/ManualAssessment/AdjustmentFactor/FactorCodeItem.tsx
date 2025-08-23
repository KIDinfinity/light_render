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

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, factorItem, productCode, policyNo, incidentId } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
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
    },
    mapPropsToFields(props: any) {
      const { factorItem } = props;
      return formUtils.mapObjectToFields(factorItem);
    },
  })(FactorCodeList)
);
