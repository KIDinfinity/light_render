import React from 'react';
import lodash from 'lodash';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { Authority, Editable, FormItemInput, Visible, RuleByForm } from 'basic/components/Form';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { fieldConfig } from './Policyno.config';

export { fieldConfig } from './Policyno.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isLast }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const policyNoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.policyNoList
  );
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const required = isLast ? lodash.isEmpty(policyNoList) : true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={required}
          labelType={isLast && 'inline'}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Policyno = ({ field, form, editable, layout, isShow, config, isLast }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={field}
      isLast={isLast}
    />
  </Authority>
);

Policyno.displayName = 'policyno';

export default Policyno;
