import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useGetOccupationCodes from '../../../_hooks/useGetOccupationCodes';
import useAutoLoadOccupationSubDict from '../../../_hooks/useAutoLoadOccupationSubDict';
import useUpdateADDPAOccupationClass from 'opus/NewBusiness/ManualUnderwriting/_hooks/useUpdateADDPAOccupationClass';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { fieldConfig } from './OccupationSecondary.config';
export { fieldConfig } from './OccupationSecondary.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const updateOccupationClass = useUpdateADDPAOccupationClass('occupationSecondary', id);
  const dicts = useGetOccupationCodes({
    config,
    field,
    fieldConfig,
    parentField: 'natureOfBusinessSecondary',
    id,
    readOnly,
  });

  const occupationFullList = useSelector(
    (state: any) => state[NAMESPACE].occupationFullList,
    shallowEqual
  );

  useAutoLoadOccupationSubDict(
    form.getFieldValue('occupationSecondary'),
    'Dropdown_IND_Occupation'
  );
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const { occupationClass, occupationClassSecondary } = form.getFieldsValue();
  const showEmphasized = readOnly && +occupationClassSecondary > +occupationClass;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          allowClear={false}
          dicts={occupationFullList?.[config?.['x-dict']?.dictTypeCode] || dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          emphasized={showEmphasized}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          onChange={(value: string) => updateOccupationClass(value)}
          precision={0}
        />
      </Col>
    )
  );
};

const OccupationSecondary = ({ form, editable, layout, isShow, id, config, readOnly }: any) => {
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

OccupationSecondary.displayName = 'occupationSecondary';

export default OccupationSecondary;
