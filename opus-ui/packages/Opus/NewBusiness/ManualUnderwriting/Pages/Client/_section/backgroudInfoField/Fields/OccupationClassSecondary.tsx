import React, { useEffect } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { Authority, Editable, FormItemSelect, RuleByForm, Visible } from 'basic/components/Form';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useGetOccupationclass from '../../../_hooks/useGetOccupationclass';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { fieldConfig } from './OccupationClassSecondary.config';
export { fieldConfig } from './OccupationClassSecondary.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();
  const dicts = useGetOccupationclass({
    fieldConfig,
    id,
    field,
    config,
    parentField: 'occupationSecondary',
    readOnly,
    isSecondary: true,
  });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const currentValue = form.getFieldValue('occupationClassSecondary');
  useEffect(() => {
    const isSingleOption = lodash.chain(dicts).size().isEqual(1).value();
    if (isSingleOption && !currentValue && !readOnly) {
      const occupationClassSecondary = lodash.chain(dicts).first().get('dictCode').value();
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'saveBackgroundInfo',
        payload: {
          id,
          changedFields: {
            occupationClassSecondary,
          },
        },
      });
    }
  }, [dicts, currentValue, readOnly]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const OccupationClassSecondary = ({
  form,
  editable,
  layout,
  isShow,
  id,
  config,
  readOnly,
}: any) => {
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
        readOnly={readOnly}
      />
    </Authority>
  );
};

OccupationClassSecondary.displayName = 'occupationClassSecondary';

export default OccupationClassSecondary;
