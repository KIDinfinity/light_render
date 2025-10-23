import React from 'react';
import { NAMESPACE } from '../../../activity.config';

import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemNumber,
  Required,
  Visible,
  Validator,
} from 'basic/components/Form';
import { isServiceItemRequired } from 'claim/pages/utils/isServiceItemRequired';
import { localFieldConfig } from './Unit.config';

export { localFieldConfig } from './Unit.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, treatmentId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = !!isServiceItemRequired(form.getFieldValue('serviceItem'));
  const requiredConditions = isServiceItemRequired(form.getFieldValue('serviceItem'));

  const treatmentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.treatmentListMap?.[treatmentId]
  );

  const { dateOfAdmission, dateOfDischarge, icuFromDate, icuToDate } = lodash.pick(treatmentItem, [
    'dateOfAdmission',
    'dateOfDischarge',
    'icuFromDate',
    'icuToDate',
  ]);

  const Rules = {
    VLD_000614: Validator.VLD_000614({
      dateOfDischarge,
      dateOfAdmission,
      icuFromDate,
      icuToDate,
      serviceItem: form.getFieldValue('serviceItem'),
    }),
  };

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
          min={0}
          max={999}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
          precision={0}
          labelType="inline"
          placeholder
        />
      </Col>
    )
  );
};

const Unit = ({ field, config, isShow, layout, form, editable, treatmentId }: any) => (
  <Authority>
    <FormItem
      field={field} config={config} isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
    />
  </Authority>
);

Unit.displayName = localFieldConfig.field;

export default Unit;
