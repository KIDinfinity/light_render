import React, { useEffect } from 'react';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { useDispatch } from 'dva';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';

import { fieldConfig } from './Sourceofpremium.config';
import {
  useCalcRequireByConditions,
  useJudgeAgencyAndEntityPO,
} from 'process/NewBusiness/ManualUnderwriting/Pages/Plan/_hooks';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
export { fieldConfig } from './Sourceofpremium.config';

const FormItem = ({ isShow, layout, form, editable, field, config, fieldType }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const isAgencyAndEntityPO = useJudgeAgencyAndEntityPO();

  useEffect(() => {
    if (isAgencyAndEntityPO) {
      dispatch({
        type: `${NAMESPACE}/savePlanInfoData`,
        payload: {
          changedFields: {
            sourceOfPremium: null,
          },
        },
      });
    }
  }, [isAgencyAndEntityPO]);

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

const Sourceofpremium = ({ fieldType, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={fieldConfig?.field}
      config={config}
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
