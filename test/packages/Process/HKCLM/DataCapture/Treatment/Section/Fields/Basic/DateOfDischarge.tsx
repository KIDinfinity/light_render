import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import {
  formUtils,
  Authority,
  Editable,
  FormItemDatePicker,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
import { NAMESPACE } from '../../../../activity.config';
import { localFieldConfig } from './DateOfDischarge.config';

export { localFieldConfig } from './DateOfDischarge.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];

  const { incidentId }: any = form.getFieldsValue(['incidentId']);

  const incidentItem =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace.claimEntities.incidentListMap?.[incidentId]
    ) || {};
  const isRegisterMcs = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.isRegisterMcs
  );

  const visibleConditions = true;
  const disableConditions =
    (form.getFieldValue('treatmentType') === 'OP' &&
      lodash.includes(formUtils.queryValue(incidentItem?.claimTypeArray), 'PA')) ||
    !!isRegisterMcs;
  const requiredConditions = Rule(fieldProps['editable-condition'], form, '');

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
              ? disableConditions
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
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const DateOfDischarge = ({ field, config, isShow, layout, form, editable }: any) => (
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

DateOfDischarge.displayName = localFieldConfig.field;

export default DateOfDischarge;
