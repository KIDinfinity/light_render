import React from 'react';
import { Col, Input } from 'antd';
import {
  Authority,
  Editable,
  FormItemAutoComplete,
  Required,
  Visible,
} from 'basic/components/Form';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './IncidentPlace.config';

export { localFieldConfig } from './IncidentPlace.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;
  const dicts = getDrowDownList({ config, fieldProps });
  const dataSource = lodash.map(dicts, (item) => item?.dictName);
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemAutoComplete
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          dataSource={dataSource}
          allowClear
        >
          <Input maxLength={config?.maxLength || fieldProps.maxLength} />
        </FormItemAutoComplete>
      </Col>
    )
  );
};

const IncidentPlace = ({ field, config, isShow, layout, form, editable }: any) => (
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

IncidentPlace.displayName = localFieldConfig.field;

export default IncidentPlace;
