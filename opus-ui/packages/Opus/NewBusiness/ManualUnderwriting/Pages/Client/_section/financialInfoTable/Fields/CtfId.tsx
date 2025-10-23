import React, { useEffect } from 'react';
import { Col } from 'antd';
import { RuleByData } from 'basic/components/Form/Rule';
import { Authority, Editable, FormItemInput, Visible, RuleByForm } from 'basic/components/Form';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { fieldConfig } from './CtfId.config';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
export { fieldConfig } from './CtfId.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const newCrs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      lodash.get(modelnamepsace, `modalData.entities.clientMap.${id}.newCrs`),
    shallowEqual
  );
  const reason = form.getFieldValue('reason');

  const visibleConditions = RuleByForm(fieldProps['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = RuleByData(config?.['required-condition'], {
    newCrs: formUtils.queryValue(newCrs),
    reason,
  });

  useEffect(() => {
    form.validateFields({ force: true });
  }, [newCrs, reason]);

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
          required={requiredConditions}
          hiddenPrefix
          placeholder=""
          precision={0}
        />
      </Col>
    )
  );
};

const CtfId = ({ form, editable, layout, isShow, config, id, crtItemId }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
        crtItemId={crtItemId}
      />
    </Authority>
  );
};

CtfId.displayName = 'ctfId';

export default CtfId;
