import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  FormItemInput,
} from 'basic/components/Form';
import useCalcRequireByConditions from 'process/NB/ManualUnderwriting/_hooks/useCalcRequireByConditions';
import { fieldConfig } from './Sourcefund.config';

export { fieldConfig } from './Sourcefund.config';

const FormItem = ({ isShow, layout, form, editable, field, config, fieldType }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = useCalcRequireByConditions({
    conditionsConfig: lodash.get(config, 'required-condition'),
  });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {((type) => {
          switch (type) {
            case 'Text':
              return (
                <FormItemInput
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
                  precision={0}
                />
              );
            default:
              return (
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
                  precision={0}
                />
              );
          }
        })(fieldType)}
      </Col>
    )
  );
};

const Sourcefund = ({ form, editable, config, layout, isShow, field }: any) => (
  <Authority>
    <FormItem
      field={field}
      isShow={isShow}
      config={lodash.get(config, 'field-props')}
      layout={layout}
      form={form}
      editable={editable}
      fieldType={lodash.get(config, 'fieldType')}
    />
  </Authority>
);

Sourcefund.displayName = 'sourceFund';

export default Sourcefund;
