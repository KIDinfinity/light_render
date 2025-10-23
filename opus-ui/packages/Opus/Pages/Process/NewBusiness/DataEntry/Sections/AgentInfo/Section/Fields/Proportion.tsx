import React, { useContext } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import Context from 'opus/Pages/Process/NewBusiness/DataEntry/_context/Context';
import { useVisibleLinkFn } from 'opus/Pages/Process/NewBusiness/DataEntry/_context/VisibleContainer';

const FormItem = ({ isShow, layout, form, editable, field, config, section }: any) => {
  const fieldProps: any = config;
  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode);
  const visibleLinkTriggerConfig =
    useContext(Context)?.visibleLinkTriggerConfig?.[`${section}_${field}`];

  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const editableConditions = !RuleByForm(
    config['editable-condition'] || fieldProps['editable-condition'],
    form
  );
  const requiredConditions = RuleByForm(
    config['required-condition'] || fieldProps['required-condition'],
    form
  );

  const onChange = useVisibleLinkFn(visibleLinkTriggerConfig, field);

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
              : (config.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={2}
          onChange={onChange}
        />
      </Col>
    )
  );
};
const field = 'proportion';

const Proportion = ({ config, form, editable, layout, isShow, section }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      section={section}
    />
  </Authority>
);

Proportion.displayName = field;

export default Proportion;
