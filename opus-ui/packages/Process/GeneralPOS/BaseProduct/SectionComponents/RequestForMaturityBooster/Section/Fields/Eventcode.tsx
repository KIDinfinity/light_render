import React, { useMemo } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { fieldConfig } from './Eventcode.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';

export { fieldConfig } from './Eventcode.config';

const FormItem = ({ isShow, layout, form, editable, field, config, isAdd }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config, fieldProps });
  const formateDicts = useMemo(() => {
    return dicts.map((item) => {
      return {
        ...item,
        dictName: `${item.dictCode}-${item.dictName}`,
      };
    });
  }, [dicts]);
  const visibleConditions = true;
  const editableConditions = isAdd || !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = !isAdd;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={formateDicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes && !isAdd
          }
          hiddenPrefix
          placeholder="Event Type"
          isInline
          allowClear={true}
        />
      </Col>
    )
  );
};

const Eventcode = ({ field, form, editable, section, layout, isShow, config, isAdd }: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      isAdd={isAdd}
      section={section}
    />
  </Authority>
);

Eventcode.displayName = 'eventCode';

export default Eventcode;
