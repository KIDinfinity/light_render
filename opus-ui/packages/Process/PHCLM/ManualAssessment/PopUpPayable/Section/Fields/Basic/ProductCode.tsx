import React, { useMemo } from 'react';

import { NAMESPACE } from '../../../../activity.config';
import lodash from 'lodash';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { getPolicyList, getPolicyForBenefitTypeListForPH } from 'basic/utils/PolicyUtils';
import { localFieldConfig } from './ProductCode.config';

export { localFieldConfig } from './ProductCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const listPolicy = getPolicyList(NAMESPACE);

  const policyNo = form.getFieldValue('policyNo');
  const dicts = useMemo(() => {
    const list = getPolicyForBenefitTypeListForPH({ policyNo, listPolicy, coverageKey: true });
    return lodash.uniqBy(list, (item) => item.coreProductCode);
  }, [listPolicy, policyNo]);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = false;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          dictCode="coreProductCode"
          dictName="productName"
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          optionShowType={'both'}
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          defaultSelectFirst={dicts.length === 1}
          getPopupContainer={() => document.body}
        />
      </Col>
    )
  );
};

const ProductCode = ({ field, config, isShow, layout, form, editable }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

ProductCode.displayName = 'coreProductCode';

export default ProductCode;
