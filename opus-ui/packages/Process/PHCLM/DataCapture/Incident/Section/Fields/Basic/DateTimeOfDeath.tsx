import React from 'react';
import { NAMESPACE } from '../../../../activity.config';

import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import {
  Authority,
  Editable,
  FormItemDatePicker,
  formUtils,
  Required,
  Visible,
} from 'basic/components/Form';
import { ClaimTypeArray } from 'basic/enum';
import { useGetInputLimitDate } from 'process/PHCLM/_hooks';

import { localFieldConfig } from './DateTimeOfDeath.config';

export { localFieldConfig } from './DateTimeOfDeath.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, incidentId }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];
  const claimTypeArray = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap[incidentId]?.claimTypeArray
  );

  const visibleConditions =
    lodash.intersection(formUtils.queryValue(claimTypeArray), [
      ClaimTypeArray.Death,
      ClaimTypeArray.OB,
      ClaimTypeArray.SE,
    ]).length > 0;
  const requiredConditions = visibleConditions;
  const editableConditions = true;
  console.log('visibleConditions', visibleConditions);

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
          allowFreeSelect={allowFreeSelect}
        />
      </Col>
    )
  );
};

const DateTimeOfDeath = ({ field, config, isShow, layout, form, editable, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={id}
    />
  </Authority>
);

DateTimeOfDeath.displayName = localFieldConfig.field;

export default DateTimeOfDeath;
