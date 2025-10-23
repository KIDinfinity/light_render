import React from 'react';

import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
} from 'basic/components/Form';
import { getPolicyList } from 'basic/utils/PolicyUtils';
import { localFieldConfig } from './ProductCode.config';

export { localFieldConfig } from './ProductCode.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const listPolicy = getPolicyList(NAMESPACE);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={listPolicy} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
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
        />
      </Col>
    )
  );
};

const ProductCode = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
    <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

ProductCode.displayName = 'productCode';

export default ProductCode;
