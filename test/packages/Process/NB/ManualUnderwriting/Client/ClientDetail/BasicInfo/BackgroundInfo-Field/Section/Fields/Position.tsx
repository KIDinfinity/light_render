import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { tenant, Region } from '@/components/Tenant';

import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useLinkDataWithIndustry from 'process/NB/ManualUnderwriting/_hooks/useLinkDataWithIndustry';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { fieldConfig } from './Position.config';

export { fieldConfig } from './Position.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const isRegionKH = tenant.region() === Region.KH;
  const fieldProps: any = fieldConfig['field-props'];

  const dicts = getDrowDownList({ config, fieldProps });

  const linkEditable = useLinkDataWithIndustry({
    id,
    monitorValue: form.getFieldValue('natureOfBusiness'),
    currentField: field,
    defaultValue: 'NONIE',
  });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });

  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isRegionKH ? (
          <FormItemInput
            disabled={
              !editable ||
              ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            hiddenPrefix
            precision={0}
          />
        ) : (
          <FormItemSelect
            dicts={dicts}
            disabled={
              linkEditable ??
              (!editable ||
                ((config?.editable || fieldProps.editable) === Editable.Conditions
                  ? editableConditions
                  : (config?.editable || fieldProps.editable) === Editable.No))
            }
            form={form}
            formName={config.name || field}
            labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Position = ({ form, editable, layout, isShow, id, config }: any) => {
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
      />
    </Authority>
  );
};

Position.displayName = 'position';

export default Position;
