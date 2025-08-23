import React from 'react';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import useSetSourceOfPremiumNull from 'process/NB/ManualUnderwriting/_hooks/useSetSourceOfPremiumNull';
import useJudgeAgencyAndEntityPO from 'process/NB/ManualUnderwriting/_hooks/useJudgeAgencyAndEntityPO';
import { fieldConfig } from './Sourceofpremium.config';
import useCalcRequireByConditions from 'process/NB/ManualUnderwriting/_hooks/useCalcRequireByConditions';

export { fieldConfig } from './Sourceofpremium.config';

const FormItem = ({ isShow, layout, form, editable, field, config, fieldType }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const isAgencyAndEntityPO = useJudgeAgencyAndEntityPO();
  useSetSourceOfPremiumNull();
  const visibleConditions = true;
  const editableConditions = !RuleByForm(fieldProps['editable-condition'], form);
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
                    isAgencyAndEntityPO ||
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
                />
              );
            default:
              return (
                <FormItemSelect
                  dicts={dicts}
                  disabled={
                    !editable ||
                    isAgencyAndEntityPO ||
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

const Sourceofpremium = ({ field, config, form, editable, layout, isShow, fieldType }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={lodash.get(config, 'field-props')}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      fieldType={fieldType}
    />
  </Authority>
);

Sourceofpremium.displayName = 'sourceOfPremium';

export default Sourceofpremium;
