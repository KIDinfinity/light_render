import { Col } from 'antd';
import { useSelector } from 'dva';
import React, { useMemo } from 'react';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './TenDaysHospitalizationFlgL.config';
export { localFieldConfig } from './TenDaysHospitalizationFlgL.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );
  const visibleConditions = true;
  const requiredConditions = false;
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const canShow = useMemo(() => {
    return (
      isShow &&
      ((config?.visible || fieldProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || fieldProps.visible) === Visible.Yes)
    );
  }, [config?.visible, fieldProps.visible, isShow, visibleConditions]);
  const canEdit = useMemo(() => {
    return (
      !editable ||
      ((config?.editable || fieldProps.editable) === Editable.Conditions
        ? !editableConditions
        : (config?.editable || fieldProps.editable) === Editable.No)
    );
  }, [config?.editable, editable, editableConditions, fieldProps.editable]);
  const isRequired = useMemo(() => {
    return config?.required === Required.Conditions
      ? requiredConditions
      : (config.required || fieldProps.required) === Required.Yes;
  }, [config.required, fieldProps.required, requiredConditions]);

  return canShow ? (
    <Col {...layout}>
      <FormItemSelect
        dicts={dicts}
        form={form}
        disabled={canEdit}
        formName={config.name || field}
        labelId={config.label?.dictCode || localFieldConfig['field-props'].label.dictCode}
        labelTypeCode={
          config.label?.dictTypeCode || localFieldConfig['field-props'].label.dictTypeCode
        }
        required={isRequired}
      />
    </Col>
  ) : null;
};

const TenDaysHospitalizationFlgL = (props: any) => {
  const { field, config, isShow, layout, form, editable } = props;
  return (
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
};

TenDaysHospitalizationFlgL.displayName = 'tenDaysHospitalizationFlgL';
export default TenDaysHospitalizationFlgL;
