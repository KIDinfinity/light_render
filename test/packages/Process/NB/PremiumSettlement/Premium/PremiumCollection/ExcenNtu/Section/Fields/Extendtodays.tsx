import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemNumber,
  Rule,
} from 'basic/components/Form';
import { NAMESPACE } from '../../../../../activity.config';
import { fieldConfig } from './Extendtodays.config';

export { fieldConfig } from './Extendtodays.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const currentRadio = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ntuDataObject?.currentRadio
  );
  const isShowNtuModal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowNtuModal
  );
  const requiredConditions = isShowNtuModal && currentRadio === 'extendtoDays';

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemNumber
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
      </Col>
    )
  );
};

const Extendtodays = ({ field, config, isShow, layout, form, editable, }: any) => (
  <Authority>
      <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

Extendtodays.displayName = 'Extendtodays';

export default Extendtodays;
