import React from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import moment from 'moment';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { NAMESPACE } from '../../../../../activity.config';
import { fieldConfig } from './Extendtodate.config';

export { fieldConfig } from './Extendtodate.config';

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');

  const currentRadio = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.ntuDataObject?.currentRadio
  );
  const isShowNtuModal = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isShowNtuModal
  );
  const requiredConditions = isShowNtuModal && currentRadio === 'extendtoDate';

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemDatePicker
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
          disabledDate={(date: any) => {
            // TODO:之所以减一是因为antd会把当前日期也disable了
            const currentDate = moment().endOf('day').subtract(1, 'day');
            return date < currentDate;
          }}
        />
      </Col>
    )
  );
};

const Extendtodate = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
      <FormItem field={field} config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

Extendtodate.displayName = 'Extendtodate';

export default Extendtodate;
