import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import lodash from 'lodash';
import React from 'react';
import { localFieldConfig } from './SurrenderReasonCode.config';

export { localFieldConfig } from './SurrenderReasonCode.config';
import { tenant, Language } from '@/components/Tenant';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { formUtils } from 'basic/components/Form';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dictTypeCode = config['x-dict']?.dictTypeCode || fieldProps['x-dict'].dictTypeCode;
  const miscDicts = useSelector(
    ({ dictionaryController }: any) => dictionaryController[dictTypeCode]
  );
  const submissionChannel = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.submissionChannel
  );

  const dicts =
    !!miscDicts &&
    miscDicts.map((item) => {
      if (tenant.isTH() && formUtils.queryValue(submissionChannel) === 'OMNE') {
        return {
          dictCode: item?.dictCode,
          dictName: formatMessageApi({
            [dictTypeCode]: item?.dictCode,
            language: Language.TH,
          }),
        };
      }
      return {
        dictCode: item?.dictCode,
        dictName: item?.dictName,
      };
    });
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  const Rules = {};

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
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={lodash.compact(
            (config?.['x-rules'] || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const SurrenderReasonCode = ({ isShow, layout, form, editable, config }: any) => (
  <Authority>
    <FormItem
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      field={localFieldConfig.field}
    />
  </Authority>
);

SurrenderReasonCode.displayName = localFieldConfig.field;

export default SurrenderReasonCode;
